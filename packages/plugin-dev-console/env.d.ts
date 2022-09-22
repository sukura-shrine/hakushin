/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_APP_NAME: string
  readonly ENV_SERVICE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
