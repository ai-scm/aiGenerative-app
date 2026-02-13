# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.4.0] - 2026-02-13
### Added
- **Strands SDK Integration**: Integrated Strands SDK to enhance the agent framework, providing improved reliability, easier tool creation, and better overall performance for agentic interactions.
- **Observability module integration**: Integrated observability module to provide enhanced monitoring and debugging capabilities for agent interactions when the agent is called by API.

## [4.3.0] - 2025-12-22

### Added

- **Strands Integration**: Implemented a new agent framework using Strands SDK to enhance agentic capabilities, simplify tool creation, and improve overall reliability.
- **Shared Knowledge Base**: Added support for creating tenants in a shared Knowledge Base, enabling more flexible and efficient knowledge management across the application.
- **Advanced Web Crawler**: Introduced granular configuration for web crawling in Knowledge Bases, including scope definitions (Default, Subdomains, Host Only) and custom include/exclude patterns.
- **New Models**:
  - **Claude 4.5 Sonnet**: Expanded Claude family support.
  - **Claude 4.5 Haiku**: Expanded Claude family support.
  - **Claude 4.5 Opus**: Expanded Claude family support.
  - **GPT OSS**: Added support for GPT OSS models.
- **Reasoning UX**: Added a dedicated "Reasoning Process" UI component to visualize the chain of thought for supported reasoning models (like DeepSeek R1).
- **Mermaid Support**: Added built-in support for rendering Mermaid diagrams, enabling users to visualize charts, graphs, and workflows directly within the chat interface.
- **Configuration**:
  - Introduced `defaultModel` setting to specify the system-wide default model.
  - Added `titleModel` setting to configure the model used specifically for generating conversation titles.

### Changed

- **UI/UX Improvements**:
  - Enhanced UI layout for markdown messages and navigation drawer groups.
  - Improved styling for the navigation drawer's bottom section.
  - Significantly improved message streaming smoothness and reduced CPU usage by optimizing chat component rendering.
  - Fixed visual "flickering" issues when new messages appear.
  - Enhanced scroll behavior when switching between conversations to prevent abrupt jumps.
- Enhanced the "thinking" indicator logic to only display for tools actually being used in the streamed message stream.
- Upgraded the `mcp` (Model Context Protocol) dependency to support the latest agentic standards.
- Upgraded related libraries to improve rendering performance and stability.

### Fixed

- Resolved an error preventing the successful invocation of the **Claude 4.1 Opus** model.
- Fixed flickering issues when rendering Mermaid diagrams.

### Security

- Updated internal dependencies to resolve security advisories and improve backend stability.

## [4.2.3] - 2025-12-18

### Added
- Configured the build pipeline to automatically upload the changelog to the products section.

## [4.2.2] - 2025-09-24

### Fixed

- Fixed an issue where conversation attributes were not being persisted correctly during storage operations.

## [4.2.1] - 2025-09-24

### Changed

- Standardized user identity and attribute naming conventions across the system data structures for better consistency.

### Added

- Included consistent user identity fields in conversation schemas to support advanced user tracking.

## [4.2.0] - 2025-08-21

### Changed

- Updated application branding to "Nadia" for English and Spanish locales.

### Fixed

- Displayed application name explicitly on the custom login screen.
- Cleaned up the authentication UI by removing redundant sign-in elements.

## [4.1.0] - 2025-08-11

### Added

- Restructured backend API routing for improved maintainability.
- Enhanced document retrieval to include metadata context in search results.
- Added support for parsing global parameters from external configuration files.
- Introduced new API capability to fetch related documents for specific conversations.
- Allowed configuration of build environment resources (memory and storage) for deployment pipelines.
- Added mechanism to handle invisible URL items in the navigation drawer.

### Changed

- Updated frontend styles for better visual consistency.
- Improved styling for navigation drawer items and groups, including enhancements for dark mode.
- Optimized search result linking to prioritize specific page metadata when available.

### Fixed

- Fixed styling issues related to color theme generation logic.
- Improved session cleanup reliability during user sign-out to prevent unwanted redirects.
- Fixed extraction of metadata from retrieval results to ensure accurate citations.

## [4.0.0] - 2025-07-31

### Added

- **Dark Theme**: Introduced comprehensive dark theme support across the application.
- **Model Support**: Expanded model support to include Claude 3.7 Sonnet (with reasoning capabilities), DeepSeek, Llama, and Mistral.
- **Multi-Agent**: Enabled integration with existing orchestration agents and multi-agent workflows.
- **Internet Agent**: Added internet search capabilities via external search provider integration.
- **Custom Domains**: Enabled custom domain configuration for the frontend distribution.
- **Deployment**: Enhanced deployment flexibility allowing parameter overrides via configuration files and multi-environment support.
- **UI Enhancements**:
  - Added utility to easily download code snippets generated by the AI.
  - Improved document navigation allowing quick jumps to relevant pages within the viewer.
  - Implemented query decomposition to improve knowledge base retrieval accuracy.
  - Added support for Polish language serialization.
- **CI/CD**: Added configuration for automated build pipelines.

### Changed
- Rebranded the application from generic naming to "Nadia".
- Standardized UI components to ensure a consistent look and feel across the application.
- Adjusted UI layout and positioning for a better user experience.
- Expanded and updated the list of supported models available for cross-region inference.
- Improved backend performance to reduce request throttling and improve reliability.
- Standardized internal data structures to better support user identity and attributes.

### Fixed
- Resolved an issue preventing the correct usage of guardrails.
- Fixed display issues with code blocks to ensure proper formatting and readability.
- Resolved errors occurring when a starred bot was not present in the recent list.
- Addressed Google Analytics timeouts and generic token refresh issues.
- Added support for third-party data sources when using existing knowledge bases.

### Security
- Updated underlying system components to resolve potential security vulnerabilities and improve stability.
