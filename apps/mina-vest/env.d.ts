/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly MINAVEST_IS_PROD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
