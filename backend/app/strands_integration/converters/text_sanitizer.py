"""
Text sanitization helpers for Strands message conversion.
"""

import re


_TOOL_RESULTS_BLOCK_RE = re.compile(
    r"<\s*tool_results?\s*>.*?<\s*/\s*tool_results?\s*>",
    flags=re.IGNORECASE | re.DOTALL,
)
_THINKING_BLOCK_RE = re.compile(
    r"<\s*thinking\s*>.*?<\s*/\s*thinking\s*>",
    flags=re.IGNORECASE | re.DOTALL,
)
_STREAM_BLOCK_RE = re.compile(
    r"<\s*stream\s*>.*?<\s*/\s*stream\s*>",
    flags=re.IGNORECASE | re.DOTALL,
)
_THINKING_OPEN_RE = re.compile(r"<\s*thinking\s*>", flags=re.IGNORECASE)
_THINKING_CLOSE_RE = re.compile(r"<\s*/\s*thinking\s*>", flags=re.IGNORECASE)
_STREAM_OPEN_RE = re.compile(r"<\s*stream\s*>", flags=re.IGNORECASE)
_STREAM_CLOSE_RE = re.compile(r"<\s*/\s*stream\s*>", flags=re.IGNORECASE)
_EXCESS_BLANK_LINES_RE = re.compile(r"\n{3,}")


def _normalize_blank_space(text: str) -> str:
    """Trim trailing line whitespace and collapse excessive blank lines."""

    text = "\n".join(line.rstrip() for line in text.splitlines())
    text = _EXCESS_BLANK_LINES_RE.sub("\n\n", text)
    return text.strip()


def sanitize_agent_text(text: str) -> str:
    """Remove agent-control wrappers while preserving thinking text."""
    sanitized = _TOOL_RESULTS_BLOCK_RE.sub("", text)
    sanitized = _STREAM_BLOCK_RE.sub("", sanitized)
    sanitized = _THINKING_OPEN_RE.sub("", sanitized)
    sanitized = _THINKING_CLOSE_RE.sub("", sanitized)
    sanitized = _STREAM_OPEN_RE.sub("", sanitized)
    sanitized = _STREAM_CLOSE_RE.sub("", sanitized)
    return _normalize_blank_space(sanitized)


def sanitize_assistant_response_text(text: str) -> str:
    """Remove internal thinking and tool result blocks from final answers."""
    sanitized = _THINKING_BLOCK_RE.sub("", text)
    sanitized = _TOOL_RESULTS_BLOCK_RE.sub("", sanitized)
    sanitized = _STREAM_BLOCK_RE.sub("", sanitized)
    sanitized = _THINKING_OPEN_RE.sub("", sanitized)
    sanitized = _THINKING_CLOSE_RE.sub("", sanitized)
    sanitized = _STREAM_OPEN_RE.sub("", sanitized)
    sanitized = _STREAM_CLOSE_RE.sub("", sanitized)
    return _normalize_blank_space(sanitized)
