/// <reference types="vitepress/client" />

interface ImportMetaEnv {
  readonly VITE_STONE_SUBMISSION_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
