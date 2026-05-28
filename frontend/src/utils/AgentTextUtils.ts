const TOOL_RESULTS_BLOCK_RE = /<\s*tool_results?\s*>[\s\S]*?<\s*\/\s*tool_results?\s*>/gi;
const THINKING_BLOCK_RE = /<\s*thinking\s*>[\s\S]*?<\s*\/\s*thinking\s*>/gi;
const STREAM_BLOCK_RE = /<\s*stream\s*>[\s\S]*?<\s*\/\s*stream\s*>/gi;
const THINKING_OPEN_RE = /<\s*thinking\s*>/gi;
const THINKING_CLOSE_RE = /<\s*\/\s*thinking\s*>/gi;
const STREAM_OPEN_RE = /<\s*stream\s*>/gi;
const STREAM_CLOSE_RE = /<\s*\/\s*stream\s*>/gi;
const EXCESS_BLANK_LINES_RE = /\n{3,}/g;

const normalizeBlankSpace = (text: string): string => {
  return text
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(EXCESS_BLANK_LINES_RE, '\n\n')
    .trim();
};

export const sanitizeAgentText = (text: string): string => {
  return normalizeBlankSpace(
    text
      .replace(TOOL_RESULTS_BLOCK_RE, '')
      .replace(STREAM_BLOCK_RE, '')
      .replace(THINKING_OPEN_RE, '')
      .replace(THINKING_CLOSE_RE, '')
      .replace(STREAM_OPEN_RE, '')
      .replace(STREAM_CLOSE_RE, '')
  );
};

export const sanitizeAssistantResponseText = (text: string): string => {
  return normalizeBlankSpace(
    text
      .replace(THINKING_BLOCK_RE, '')
      .replace(TOOL_RESULTS_BLOCK_RE, '')
      .replace(STREAM_BLOCK_RE, '')
      .replace(THINKING_OPEN_RE, '')
      .replace(THINKING_CLOSE_RE, '')
      .replace(STREAM_OPEN_RE, '')
      .replace(STREAM_CLOSE_RE, '')
  );
};
