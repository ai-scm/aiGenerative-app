import { BedrockChatParametersInput } from "./lib/utils/parameter-models";
const json = require("./config.app.json");

export const bedrockChatParams = new Map<string, BedrockChatParametersInput>();
// You can define multiple environments and their parameters here
// bedrockChatParams.set("dev", {});

// If you define "default" environment here, parameters in cdk.json are ignored
// bedrockChatParams.set("default", {});
// Define parameters for additional environments
bedrockChatParams.set(json.pipelineName, json.params )