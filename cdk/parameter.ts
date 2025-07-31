import { BedrockChatParametersInput } from "./lib/utils/parameter-models";

export const bedrockChatParams = new Map<string, BedrockChatParametersInput>();
// You can define multiple environments and their parameters here
// bedrockChatParams.set("dev", {});

// If you define "default" environment here, parameters in cdk.json are ignored
// bedrockChatParams.set("default", {});
// Define parameters for additional environments
bedrockChatParams.set("dev", {
  identityProviders: [    {
        "service": "oidc",
        "serviceName": "iam-oidc",
        "secretName": "bndDevsNadia4Secret"
        }
    ],
  userPoolDomainPrefix: "bnd-devs-nadia4",
  bedrockRegion: "us-east-1",
  allowedSignUpEmailDomains: [
    "nuvu.cc",
    "blend360.com"
  ],
  autoJoinUserGroups: [],
  alternateDomainName: "nadia4.devs.ia.blend360.com",
  hostedZoneId: "Z04006331RMWHUIG10GV",
});