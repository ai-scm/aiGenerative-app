"""
Observability integration for Strands agents.

"""
from __future__ import annotations

import logging
import datetime
from dataclasses import dataclass
from typing import Any, Callable, Optional, Protocol

from .observability_config import get_observability_config, ObservabilityConfig

logger = logging.getLogger(__name__)


# ============================================================
# PROTOCOLS
# ============================================================


class CallbackHandlerProtocol(Protocol):
    """Protocol for callback handlers."""

    def __call__(self, **kwargs: Any) -> None: ...


# ============================================================
# RESULT TYPES
# ============================================================


@dataclass(frozen=True)
class ObservabilityContext:
    """Immutable context for observability."""

    logger: Optional[Any]  # AgentLogger when enabled
    agent_node: Optional[Any]  # AgentNode when enabled

    @property
    def is_active(self) -> bool:
        return self.logger is not None and self.agent_node is not None


# ============================================================
# LAZY IMPORTS
# ============================================================

_observability_module: Optional[dict[str, Any]] = None


def _get_observability_module() -> dict[str, Any]:
    """Lazy import to avoid loading when disabled."""
    global _observability_module
    if _observability_module is None:
        try:
            from observability_logger import AgentLogger, generate_id

            _observability_module = {"AgentLogger": AgentLogger, "generate_id": generate_id}
        except ImportError as e:
            logger.warning(f"Failed to import observability_logger: {e}")
            _observability_module = {}
    return _observability_module


# ============================================================
# CALLBACK HANDLER COMPOSITION
# ============================================================


class CompositeCallbackHandler:
    """
    Composes multiple callback handlers.
    """

    def __init__(self, handlers: list[CallbackHandlerProtocol]):
        self._handlers = handlers

    def __call__(self, **kwargs: Any) -> None:
        """Forward events to all handlers - fail-silent."""
        for handler in self._handlers:
            if handler is not None:
                try:
                    handler(**kwargs)
                except Exception as e:
                    # Defensive: never let observability break main flow
                    logger.debug(f"Handler error (ignored): {e}")


# ============================================================
# PUBLIC API
# ============================================================


def create_observability_context(
    workflow_id: str,
    title: str,
    bot_id: Optional[str] = None,
    conversation_id: Optional[str] = None,
    config: Optional[ObservabilityConfig] = None,
) -> ObservabilityContext:
    """
    Create observability context if enabled.

    Args:
        workflow_id: Identifier for the workflow type
        title: Human-readable trace title
        bot_id: Optional bot identifier
        conversation_id: Optional conversation identifier
        config: Optional config for testing (DI)

    Returns:
        ObservabilityContext (may be inactive if disabled)
    """
    config = config or get_observability_config()

    if not config.enabled or not config.is_valid():
        return ObservabilityContext(logger=None, agent_node=None)

    try:
        module = _get_observability_module()
        if not module:
            return ObservabilityContext(logger=None, agent_node=None)

        AgentLogger = module["AgentLogger"]
        generate_id = module["generate_id"]

        # Create trace
        trace_id = ("CONV_" + conversation_id)
        obs_logger = AgentLogger(
            trace_id=trace_id,
            workflow_id=workflow_id,
            title=title,
        )

        # Router node: entry point
        router_node = obs_logger.router(
            node_id=generate_id("node_"),
            config={"name": "Entry " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "description": "Request entry point"},
            metadata={"bot_id": bot_id, "conversation_id": conversation_id},
        )

        # Agent node: Strands execution
        agent_node = obs_logger.strands.agent(
            node_id=generate_id("node_"),
            config={"name": "Agent " + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "description": "Agent execution"},
            metadata={"workflow_id": workflow_id},
        )

        # Connect: router -> agent
        obs_logger.edge(router_node, agent_node)

        return ObservabilityContext(logger=obs_logger, agent_node=agent_node)

    except Exception as e:
        logger.error(f"Failed to create observability context: {e}")
        return ObservabilityContext(logger=None, agent_node=None)


def complete_observability_context(
    context: ObservabilityContext,
    result: Optional[Any] = None,
    status: str = "completed",
    error: Optional[Exception] = None,
) -> None:
    """
    Complete observability trace - fail-silent.

    Args:
        context: The observability context to complete
        result: Optional agent result for metrics extraction
        status: Trace status ("completed" or "failed")
        error: Optional exception if failed
    """
    if not context.is_active:
        return

    try:
        context.agent_node.complete(result=result, error=error)
        context.logger.end(status=status)
    except Exception as e:
        logger.error(f"Failed to complete observability: {e}")


def compose_callback_handlers(
    base_handler: Optional[CallbackHandlerProtocol],
    context: ObservabilityContext,
) -> Optional[CallbackHandlerProtocol]:
    """
    Compose base handler with observability agent node.

    Args:
        base_handler: Existing callback handler
        context: Observability context (may be inactive)

    Returns:
        Composite handler or base handler if context inactive
    """
    if not context.is_active:
        return base_handler

    handlers = [h for h in [base_handler, context.agent_node] if h is not None]
    return CompositeCallbackHandler(handlers)
