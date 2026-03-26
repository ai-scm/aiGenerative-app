import os
import json
import boto3
from aws_lambda_powertools import Logger, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext

USER_POOL_ID: str = os.environ["USER_POOL_ID"]

logger = Logger()
tracer = Tracer()

cognito = boto3.client("cognito-idp")


@tracer.capture_lambda_handler
@logger.inject_lambda_context(log_event=True)
def handler(event: dict, context: LambdaContext) -> dict:
    user_name: str = event["userName"]
    user_attributes: dict = event["request"]["userAttributes"]
    trigger_source: str = event["triggerSource"]
    
    if trigger_source == "PostAuthentication_Authentication":
        # 1. Fallback / Cloned logic from AddUserToGroups to not break native users
        user_status: str = user_attributes.get("cognito:user_status", "")
        if user_status == "FORCE_CHANGE_PASSWORD":
            auto_join_groups = json.loads(os.environ.get("AUTO_JOIN_USER_GROUPS", "[]"))
            for group in auto_join_groups:
                logger.info(f"Adding native user '{user_name}' to default group '{group}'")
                try:
                    cognito.admin_add_user_to_group(
                        UserPoolId=USER_POOL_ID,
                        Username=user_name,
                        GroupName=group,
                    )
                except Exception as e:
                    logger.error(f"Failed to assign user to group '{group}': {e}")
            
        # 2. OIDC Role Sync Logic
        sync_oidc_roles(event, USER_POOL_ID, user_name)

    return event

def sync_oidc_roles(event: dict, user_pool_id: str, username: str):
    user_attributes = event.get("request", {}).get("userAttributes", {})
    roles_claim = user_attributes.get("custom:kc_roles", "")
    
    if not roles_claim:
        return
        
    # roles_str = roles_claim.replace('[', '').replace(']', '').replace('"', '') # Original line
    client_roles = set(json.loads(roles_claim))
    
    # 2. Get current Cognito groups
    user_groups = set()
    try:
        # TODO: Handle pagination if user has > 50 groups
        response = cognito.admin_list_groups_for_user(
            UserPoolId=user_pool_id,
            Username=username,
            Limit=50
        )
        for group in response.get("Groups", []):
            user_groups.add(group["GroupName"])
    except Exception as e:
        logger.error(f"Failed to list user groups: {str(e)}")
        # If we fail to read current groups we cannot safely determine what to remove or add
        return # Changed from `return event` as this function doesn't return event
        
    logger.debug(f"Current cognito groups: {user_groups}")
    logger.debug(f"Target keycloak roles: {client_roles}")

    # 3. Calculate Deltas
    roles_to_add = client_roles - user_groups
    roles_to_remove = user_groups - client_roles
    
    # 4. Process Synchronized Removals (Strict Sync)
    for role in roles_to_remove:
        logger.info(f"Removing user '{username}' from OIDC group '{role}' (Strict Sync)")
        try:
            cognito.admin_remove_user_from_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=role
            )
        except Exception as e:
            logger.error(f"Failed to remove user from group '{role}': {str(e)}")

    # 5. Process Synchronized Additions
    for role in roles_to_add:
        logger.info(f"Syncing user '{username}' to missing OIDC group '{role}'")
        try: # Added try-except block for adding roles
            cognito.admin_add_user_to_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=role # Changed 'group' to 'role' for consistency
            )
        except cognito.exceptions.ResourceNotFoundException:
            try:
                logger.info(f"Group '{role}' not found. Creating it (Self-Healing).")
                cognito.create_group(
                    UserPoolId=user_pool_id,
                    GroupName=role,
                    Description="Auto-generated from Keycloak OIDC"
                )
                cognito.admin_add_user_to_group(
                    UserPoolId=user_pool_id,
                    Username=username,
                    GroupName=role
                )
            except cognito.exceptions.GroupExistsException:
                cognito.admin_add_user_to_group(
                    UserPoolId=user_pool_id,
                    Username=username,
                    GroupName=role
                )
            except Exception as e:
                logger.error(f"Failed to create and assign group '{role}': {str(e)}")
        except Exception as e:
            logger.error(f"Failed to assign user to group '{role}': {str(e)}")
