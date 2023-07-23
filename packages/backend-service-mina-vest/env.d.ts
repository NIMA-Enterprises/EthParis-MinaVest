/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly BACKEND_SERVICE_MINA_VEST_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
