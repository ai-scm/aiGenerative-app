from app.routes.schemas.base import BaseSchema
from app.routes.schemas.conversation import Content, MessageOutput, ToolResult, type_model_name
from pydantic import Field

#nuevo esquema para atributos
class UserAttributes(BaseSchema):
    sigla: str | None = None
    dependencia: str | None = None
    unidad: str | None = None
class MessageInputWithoutMessageId(BaseSchema):
    content: list[Content]
    model: type_model_name


class ChatInputWithoutBotId(BaseSchema):
    conversation_id: str | None = Field(
        None,
        description="""Unique conversation id. 
        If not provided, new conversation will be generated.""",
    )
    message: MessageInputWithoutMessageId
    continue_generate: bool = Field(False)
    enable_reasoning: bool = Field(False)
    user_id: str | None = None
    attributes: UserAttributes | None = None


class ChatOutputWithoutBotId(BaseSchema):
    conversation_id: str
    message: MessageOutput
    create_time: float


class MessageRequestedResponse(BaseSchema):
    conversation_id: str
    message_id: str
    secret: str = "secret"

class RelatedDocument(BaseSchema):
    content: ToolResult
    source_id: str
    source_name: str | None = None
    source_link: str | None = None
    page_number: int | None = None