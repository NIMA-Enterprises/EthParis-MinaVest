/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly MINAVEST_IS_PROD: string;
	readonly WALLET_CONNECTION_IS_PROD: string;
	readonly BACKEND_SERVICE_MINA_VEST_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
