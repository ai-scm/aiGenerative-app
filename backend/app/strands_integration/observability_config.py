"""
Observability configuration - Single Responsibility: configuration only.
Follows: cross_platform_code (env vars), defensive_programming (validation).
"""
from __future__ import annotations

import os
import logging
from dataclasses import dataclass
from typing import Optional

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class ObservabilityConfig:
    """Immutable configuration for observability module."""

    enabled: bool
    kinesis_stream_arn: Optional[str]
    kinesis_stream_name: Optional[str]
    aws_region: str

    def is_valid(self) -> bool:
        """Validate configuration is complete for enabled state."""
        if not self.enabled:
            return True
        return bool(self.kinesis_stream_name)


def load_observability_config() -> ObservabilityConfig:
    """
    Load config from environment - fail-fast validation.

    Environment Variables:
        OBSERVABILITY_ENABLED: Feature flag (default: false)
        KINESIS_OBSERVABILTY_LOGGER_STREAM_ARN: Full ARN for logging
        KINESIS_STREAM_NAME: Stream name (required when enabled)
        AWS_REGION: AWS region (default: us-east-1)
    """
    enabled = os.getenv("OBSERVABILITY_ENABLED", "false").lower() == "true"
    kinesis_arn = os.getenv("KINESIS_OBSERVABILTY_LOGGER_STREAM_ARN")
    kinesis_name = os.getenv("KINESIS_STREAM_NAME")
    aws_region = os.getenv("AWS_REGION", "us-east-1")

    config = ObservabilityConfig(
        enabled=enabled,
        kinesis_stream_arn=kinesis_arn,
        kinesis_stream_name=kinesis_name,
        aws_region=aws_region,
    )

    if enabled:
        print(f"Observability Config Loading: Enabled={enabled}, Region={aws_region}")
        if not config.is_valid():
            logger.warning(
                "OBSERVABILITY_ENABLED=true but KINESIS_STREAM_NAME not set. "
                "Observability will be disabled."
            )
    return config


_config: Optional[ObservabilityConfig] = None


def get_observability_config() -> ObservabilityConfig:
    global _config
    if _config is None:
        _config = load_observability_config()
    return _config


def reset_config() -> None:
    global _config
    _config = None
