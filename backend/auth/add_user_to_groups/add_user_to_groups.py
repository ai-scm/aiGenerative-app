import os
import json

import boto3
from aws_lambda_powertools import Logger, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext

USER_POOL_ID: str = os.environ["USER_POOL_ID"]
AUTO_JOIN_USER_GROUPS: list[str] = json.loads(
    os.environ.get("AUTO_JOIN_USER_GROUPS", "[]")
)

logger = Logger()
tracer = Tracer()

cognito = boto3.client("cognito-idp")


@tracer.capture_lambda_handler
@logger.inject_lambda_context(log_event=True)
def handler(event: dict, context: LambdaContext) -> dict:
    user_name: str = event["userName"]
    user_attributes: dict = event["request"]["userAttributes"]

    trigger_source: str = event["triggerSource"]
    if trigger_source == "PostConfirmation_ConfirmSignUp":
        add_user_to_groups(USER_POOL_ID, user_name, AUTO_JOIN_USER_GROUPS)

    elif trigger_source == "PostAuthentication_Authentication":
        user_status: str = user_attributes.get("cognito:user_status", "")
        if user_status == "FORCE_CHANGE_PASSWORD":
            add_user_to_groups(USER_POOL_ID, user_name, AUTO_JOIN_USER_GROUPS)
            
        sync_oidc_roles(event, USER_POOL_ID, user_name)

    return event


def add_user_to_groups(user_pool_id: str, username: str, groups: list[str]):
    for group in groups:
        logger.info(f"Adding user '{username}' to group '{group}'")
        cognito.admin_add_user_to_group(
            UserPoolId=user_pool_id,
            Username=username,
            GroupName=group,
        )

def sync_oidc_roles(event: dict, user_pool_id: str, username: str):
    user_attributes = event.get("request", {}).get("userAttributes", {})
    roles_claim = user_attributes.get("custom:groups", "")
    
    if not roles_claim:
        return
        
    roles_str = roles_claim.replace('[', '').replace(']', '').replace('"', '')
    roles_list = [r.strip() for r in roles_str.split(',') if r.strip()]
    
    TARGET_PREFIX = "nadia-"
    required_groups = {role for role in roles_list if role.startswith(TARGET_PREFIX)}
    
    if not required_groups:
        return
        
    try:
        response = cognito.admin_list_groups_for_user(
            UserPoolId=user_pool_id,
            Username=username
        )
        current_groups = {g.get("GroupName") for g in response.get("Groups", [])}
    except Exception as e:
        logger.warning(f"Error listing current groups for user {username}: {e}")
        current_groups = set()
        
    missing_groups = required_groups - current_groups
    
    for group in missing_groups:
        try:
            logger.info(f"Syncing user '{username}' to missing OIDC group '{group}'")
            cognito.admin_add_user_to_group(
                UserPoolId=user_pool_id,
                Username=username,
                GroupName=group
            )
        except cognito.exceptions.ResourceNotFoundException:
            try:
                logger.info(f"Group '{group}' not found. Creating it (Self-Healing).")
                cognito.create_group(
                    UserPoolId=user_pool_id,
                    GroupName=group,
                    Description="Auto-generated from Keycloak OIDC"
                )
                cognito.admin_add_user_to_group(
                    UserPoolId=user_pool_id,
                    Username=username,
                    GroupName=group
                )
            except cognito.exceptions.GroupExistsException:
                cognito.admin_add_user_to_group(
                    UserPoolId=user_pool_id,
                    Username=username,
                    GroupName=group
                )
            except Exception as e:
                logger.error(f"Failed to create and assign group '{group}': {e}")
        except Exception as e:
            logger.error(f"Failed to assign user to group '{group}': {e}")
