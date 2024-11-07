/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly WEB_PORT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
