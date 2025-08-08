# Manual de Ejecución en Local - Nadia

Este manual describe los pasos necesarios para ejecutar el proyecto Nadia en un entorno de desarrollo local.

## Backend

### Instalación y Configuración

#### 1. Instalación de Poetry

Instalar Poetry en el sistema local:

```bash
sudo apt install python3-poetry
```

#### 2. Configuración del Proyecto

1. Navegar a la carpeta del backend desde la terminal
2. Modificar el archivo `pyproject.toml`:
   - Cambiar la versión de Python a `python = "^3.12.0"`
   - Esto permite compatibilidad con Python 3.12 (por defecto requiere Python 3.13+)

#### 3. Configuración del Ambiente Virtual

1. Generar y activar un ambiente virtual llamado `.venv`
2. Ejecutar los siguientes comandos:

```bash
pip install poetry
poetry lock
poetry install
```

#### 4. Ejecución del Proyecto

Para ejecutar el backend, usar el siguiente comando:

```bash
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Configuración de Debug en VSCode

#### 1. Configuración de Debug

Crear o modificar el archivo `.vscode/launch.json` con la siguiente configuración:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python Debugger: FastAPI",
            "type": "debugpy",
            "request": "launch",
            "module": "uvicorn",
            "args": [
                "app.main:app",
                "--reload",
                "--host",
                "0.0.0.0",
                "--port",
                "8000"
            ],
            "env": {
                "CONVERSATION_TABLE_NAME": "tag de ambiente de nadia-BedrockChatStack-DatabaseConversationTable...",
                "BOT_TABLE_NAME": "tag de ambiente de nadia-BedrockChatStack-DatabaseBotTable....",
                "ACCOUNT": "id de la cuenta de aws",
                "REGION": "us-east-1",
                "BEDROCK_REGION": "us-east-1",
                "DOCUMENT_BUCKET": "tag de ambiente de nadia-bedrockregionres-useast1documentbucket...",
                "LARGE_MESSAGE_BUCKET": "tag de ambiente de nadia-bedrockchatstack-largemessagebucket....",
                "USER_POOL_ID": "id de la user pool de nadia en cognito",
                "CLIENT_ID": "id del cliente de nadia en tag de ambiente de nadia",
                "OPENSEARCH_DOMAIN_ENDPOINT": "url del dominio de opensearch de nadia",
                "AWS_ACCESS_KEY_ID": "",
                "AWS_SECRET_ACCESS_KEY": "",
                "AWS_SESSION_TOKEN": "",
                "CORS_ALLOW_ORIGINS": "https://*",
                "PUBLISHED_API_ID": "id del bot que está publicado por api",
                "QUEUE_URL": "https://sqs.us-east-1.amazonaws.com/081899001252/ApiPublishmentStack01K1XHCJ3GERCGNREJBSP27QG1-ChatQueue3053B7B3-EeXgYujhzVLM",
                "TABLE_ACCESS_ROLE_ARN": "arn:aws:iam::081899001252:role/cattest4-BedrockChatStack-DatabaseTableAccessRole59-w8Eb6JNT5OW7",
                "ENABLE_BEDROCK_CROSS_REGION_INFERENCE": "true",
                "LARGE_PAYLOAD_SUPPORT_BUCKET": "cattest4-bedrockchatstack-websocketlargepayloadsup-vq5ypi80qu7s",
                "WEBSOCKET_SESSION_TABLE_NAME": "cattest4-BedrockChatStack-DatabaseWebsocketSessionTable2302422E-78VZP3VMY4SG",
                "TABLE_ARN": "arn de CONVERSATION_TABLE_NAME",
                "AWS_LAMBDA_EXEC_WRAPPER": "/opt/bootstrap",
                "ENV_NAME": "tag de ambiente de nadia",
                "ENV_PREFIX": "tag de ambiente de nadia",
                "PUBLISH_API_CODEBUILD_PROJECT_NAME": "ApiPublishCodebuildProject3-ktehaOkkegkr"
            },
            "jinja": true,
            "console": "integratedTerminal",
            "python": "${workspaceFolder}/backend/.venv/bin/python",
            "cwd": "${workspaceFolder}/backend"
        }
    ]
}
```

#### 2. Modificación del Usuario de Prueba

Editar el archivo `backend/app/main.py` en la función `add_current_user_to_request`:

**Cambiar:**
```python
id="test_user", name="test_user", email="user@example.com", groups=[]
```

**Por:**
- `id`: ID de un usuario específico (para probar rutas de conversaciones, ej `64b8f498-6031-7002-7574-2683f4532c2a`)
- `#API...`: Para probar endpoints de API, ej `PUBLISHED_API#01K25C9XD3227C3SYTMF5NJE6N`

### ⚠️ Importante para Despliegue

Antes del despliegue:
1. Revertir todos los cambios realizados en los archivos de configuración del backend (archivos como `pyproject.toml`)
2. Eliminar el ambiente virtual creado
3. Eliminar la carpeta `.vscode`

## Frontend

### Configuración

#### 1. Navegación al Directorio

Desde la terminal, ubicarse en la raíz del proyecto y dirigirse a la carpeta `frontend`.

#### 2. Configuración de Variables de Entorno

Crear un archivo `.env.local` en la carpeta `frontend` con las siguientes variables:

```bash
VITE_APP_API_ENDPOINT="https://xb04eq0cqi.execute-api.us-east-1.amazonaws.com"
VITE_APP_WS_ENDPOINT="wss://fkqi935a6l.execute-api.us-east-1.amazonaws.com/dev/"
VITE_APP_USER_POOL_ID="id de la user pool de nadia en cognito"
VITE_APP_USER_POOL_CLIENT_ID="id del cliente de nadia en tag de ambiente de nadia"
VITE_APP_REGION="us-east-1"
VITE_APP_REDIRECT_SIGNIN_URL="http://localhost:5173/"
VITE_APP_REDIRECT_SIGNOUT_URL="http://localhost:5173/"
VITE_APP_COGNITO_DOMAIN="dominio de redirección del cliente de nadia en cognito"
VITE_APP_USE_STREAMING="true"
VITE_APP_SOCIAL_PROVIDERS=""
VITE_APP_CUSTOM_PROVIDER_NAME="iam-oidc"
```

#### 3. Ejecución del Frontend

Ejecutar el siguiente comando en la terminal ubicada en la carpeta `frontend`:

```bash
npm run dev
```

## Resumen de Comandos Rápidos

### Backend
```bash
# Instalación
sudo apt install python3-poetry
cd backend/
pip install poetry
poetry lock && poetry install

# Ejecución
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Configuración y ejecución
cd frontend/
# Crear archivo .env.local (ver configuración arriba)
npm run dev
```