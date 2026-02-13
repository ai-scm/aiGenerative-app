import json
import logging
import os
from time import sleep

import boto3
from app.routes.schemas.conversation import ChatInput, Conversation, MessageInput
from app.routes.schemas.published_api import (
    ChatInputWithoutBotId,
    ChatOutputWithoutBotId,
    MessageRequestedResponse,
    RelatedDocument
)
from app.usecases.chat import chat, chat_output_from_message, fetch_conversation
from app.user import User
from app.repositories.conversation import find_related_documents_by_conversation_id
from fastapi import APIRouter, HTTPException, Request
from ulid import ULID

logger = logging.getLogger(__name__)

router = APIRouter(tags=["published_api"])

LOCAL_SYNC_MODE = os.environ.get("LOCAL_SYNC_MODE", "false").lower() == "true"
QUEUE_URL = os.environ.get("QUEUE_URL", "")

#TODO borrar para version de produccion

if not LOCAL_SYNC_MODE:
    sqs_client = boto3.client("sqs")
else:
    sqs_client = None
    logger.info("LOCAL_SYNC_MODE enabled: bypassing SQS, calling chat() directly")


@router.get("/health")
def health():
    """For health check"""
    return {"status": "ok"}


@router.post("/conversation", response_model=MessageRequestedResponse)
def post_message(request: Request, message_input: ChatInputWithoutBotId):
    """Send chat message"""
    current_user: User = request.state.current_user

    # Extract bot_id from `current_user.id`
    # NOTE: user_id naming rule is implemented on `add_current_user_to_request` method
    bot_id = (
        current_user.id.split("#")[1] if "#" in current_user.id else current_user.id
    )

    # Generate conversation id if not provided
    conversation_id = (
        str(ULID())
        if message_input.conversation_id is None
        else message_input.conversation_id
    )
    # Issue id for the response message
    response_message_id = str(ULID())

    chat_input = ChatInput(
        conversation_id=conversation_id,
        message=MessageInput(
            role="user",
            content=message_input.message.content,
            model=message_input.message.model,
            parent_message_id=None,  # Use the latest message as the parent
            message_id=response_message_id,
        ),
        bot_id=bot_id,
        continue_generate=message_input.continue_generate,
        enable_reasoning=message_input.enable_reasoning,
        userId = message_input.userId,
        attributes=message_input.attributes
    )

    #TODO borrar para version de produccion

    if LOCAL_SYNC_MODE:
        # Bypass SQS — call chat() directly (same path as sqs_consumer Lambda)
        user = User.from_published_api_id(chat_input.bot_id)
        try:
            conversation, message = chat(user=user, chat_input=chat_input)
            logger.info(f"LOCAL_SYNC_MODE: chat() completed for conversation {conversation_id}")
        except Exception as e:
            logger.error(f"LOCAL_SYNC_MODE: chat() failed: {e}")
            raise HTTPException(status_code=500, detail=str(e))
    else:
        try:
            _ = sqs_client.send_message(
                QueueUrl=QUEUE_URL, MessageBody=chat_input.model_dump_json()
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return MessageRequestedResponse(
        conversation_id=conversation_id, message_id=response_message_id
    )


@router.get("/conversation/{conversation_id}", response_model=Conversation)
def get_conversation(request: Request, conversation_id: str):
    """Get a conversation history. If the conversation does not exist, it will return 404."""
    current_user: User = request.state.current_user

    output = fetch_conversation(current_user.id, conversation_id)
    return output

@router.get(
    "/conversation/{conversation_id}/related-documents",
    response_model=list[RelatedDocument],
)
def get_related_documents(
    request: Request, conversation_id: str
) -> list[RelatedDocument]:
    """Get related documents"""
    current_user: User = request.state.current_user

    related_documents = find_related_documents_by_conversation_id(
        user_id=current_user.id,
        conversation_id=conversation_id,
    )
    return [related_document.to_schema() for related_document in related_documents]

@router.get(
    "/conversation/{conversation_id}/{message_id}",
    response_model=ChatOutputWithoutBotId,
)
def get_message(request: Request, conversation_id: str, message_id: str):
    """Get specified message in a conversation. If the message does not exist, it will return 404."""
    current_user: User = request.state.current_user

    conversation = fetch_conversation(current_user.id, conversation_id)
    input_message = conversation.message_map.get(message_id, None)
    if input_message is None:
        raise HTTPException(
            status_code=404,
            detail=f"Message {message_id} not found in conversation {conversation_id}",
        )
    output_message_id = input_message.children[0]
    output_message = conversation.message_map.get(output_message_id, None)
    if output_message is None:
        raise HTTPException(
            status_code=404,
            detail=f"Message {message_id} not found in conversation {conversation_id}",
        )

    return ChatOutputWithoutBotId(
        conversation_id=conversation_id,
        message=output_message,
        create_time=conversation.create_time,
    )


