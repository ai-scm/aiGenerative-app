# Manual de Ejecución en Local - Nadia

Este manual describe los pasos para ejecutar Nadia (Frontend + Backend) localmente con IAM-OIDC.

---

## Requisitos Previos

- **Python 3.12+** (cambiar `^3.13.0` → `^3.12.0` en `pyproject.toml`)
- **Node.js 18+** y npm
- **Poetry** para Python
- **Credenciales AWS** con acceso a DynamoDB, S3, Cognito, Bedrock

---

## Frontend

### 1. Instalación

```bash
cd frontend/
npm install
```

### 2. Variables de Entorno

Crear `frontend/.env.local`:

```bash
# === API Endpoints ===
# Backend REMOTO (AWS):
VITE_APP_API_ENDPOINT="<BackendApiUrl de CloudFormation>"
VITE_APP_WS_ENDPOINT="<WebSocketEndpoint de CloudFormation>"

# Backend LOCAL:
# VITE_APP_API_ENDPOINT="http://localhost:8000"
# VITE_APP_WS_ENDPOINT=""

# === Cognito ===
VITE_APP_USER_POOL_ID="<UserPoolId de CloudFormation>"
VITE_APP_USER_POOL_CLIENT_ID="<UserPoolClientId de CloudFormation>"
VITE_APP_REGION="us-east-1"

# === OAuth/OIDC ===
VITE_APP_REDIRECT_SIGNIN_URL="http://localhost:5173/"
VITE_APP_REDIRECT_SIGNOUT_URL="http://localhost:5173/"
# ⚠️ SIN "https://" - solo el dominio
VITE_APP_COGNITO_DOMAIN="<CognitoDomain de CloudFormation sin https://>"

# === IAM-OIDC (Keycloak) ===
VITE_APP_USE_STREAMING="true"
VITE_APP_SOCIAL_PROVIDERS=""
VITE_APP_CUSTOM_PROVIDER_ENABLED="true"
VITE_APP_CUSTOM_PROVIDER_NAME="iam-oidc"
```

### 3. Configurar Cognito (Primera vez)

Añadir `http://localhost:5173/` a Allowed callback URLs:

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id <USER_POOL_ID> \
  --client-id <CLIENT_ID> \
  --callback-urls "<FrontendURL de producción>" "http://localhost:5173/" \
  --logout-urls "<FrontendURL de producción>" "http://localhost:5173/" \
  --supported-identity-providers "iam-oidc" "COGNITO" \
  --allowed-o-auth-flows code \
  --allowed-o-auth-scopes openid email \
  --allowed-o-auth-flows-user-pool-client \
  --region us-east-1
```

### 4. Configurar Keycloak (Primera vez)

Añadir a **Valid redirect URIs** del cliente en Keycloak:
```
<ApprovedRedirectURI de CloudFormation>
```

### 5. Ejecución

```bash
npm run dev
```

Frontend: `http://localhost:5173/`

---

## Backend

### 1. Instalación

```bash
cd backend/
python -m venv .venv
source .venv/bin/activate
pip install poetry
poetry lock && poetry install
```

### 2. Variables de Entorno

| Variable                      | Descripción              | CloudFormation Output         |
| ----------------------------- | ------------------------ | ----------------------------- |
| `CONVERSATION_TABLE_NAME`     | Tabla conversaciones     | `ConversationTableNameV3`     |
| `BOT_TABLE_NAME`              | Tabla bots               | `BotTableNameV3`              |
| `ACCOUNT`                     | ID cuenta AWS            | `aws sts get-caller-identity` |
| `REGION`                      | Región                   | `us-east-1`                   |
| `BEDROCK_REGION`              | Región Bedrock           | `us-east-1`                   |
| `USER_POOL_ID`                | Cognito User Pool        | `AuthUserPoolId`              |
| `CLIENT_ID`                   | Cognito Client           | `AuthUserPoolClientId`        |
| `DOCUMENT_BUCKET`             | Bucket documentos        | `DocumentBucketName`          |
| `LARGE_MESSAGE_BUCKET`        | Bucket mensajes          | `LargeMessageBucketName`      |
| `TABLE_ACCESS_ROLE_ARN`       | Rol acceso tablas        | `TableAccessRoleArn`          |
| `CORS_ALLOW_ORIGINS`          | CORS                     | `http://localhost:5173`       |
| `OPENSEARCH_DOMAIN_ENDPOINT`  | OpenSearch (opcional)    | `BotStoreOpenSearchEndpoint`  |
| `EMBEDDING_STATE_MACHINE_ARN` | State Machine (opcional) | `EmbeddingStateMachineArn`    |

### 3. Configuración VSCode

Ver `.vscode/launch.json` con valores configurados.

### 4. Ejecución

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend: `http://localhost:8000/docs`

---

## Obtener Valores de CloudFormation

```bash
aws cloudformation describe-stacks \
  --stack-name <NOMBRE-DEL-STACK>-BedrockChatStack \
  --query 'Stacks[0].Outputs' \
  --output table
```

---

## Troubleshooting

| Error                        | Solución                                  |
| ---------------------------- | ----------------------------------------- |
| `https://https//...`         | Quitar `https://` de COGNITO_DOMAIN       |
| `redirect_mismatch`          | Añadir URL a Cognito Callback URLs        |
| `RedirectUri not registered` | Añadir `oauth2/idpresponse` a Keycloak    |
| Usuario mock                 | Frontend debe enviar Authorization header |

---

## Ejecución Simultánea (Frontend + Backend Local)

### Terminal 1: Backend
```bash
cd backend/
source .venv/bin/activate
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2: Frontend
```bash
cd frontend/
# En .env.local cambiar:
# VITE_APP_API_ENDPOINT="http://localhost:8000"
npm run dev
```

---

## Resumen de Comandos Rápidos

### Backend
```bash
cd backend/
pip install poetry
poetry lock && poetry install
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend/
npm install
npm run dev
```

---

## Antes de Desplegar

1. Revertir `pyproject.toml`
2. Eliminar `.venv/` y `.vscode/`
3. No commitear `.env.local`