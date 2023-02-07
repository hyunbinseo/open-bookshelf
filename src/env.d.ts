/* eslint-disable @typescript-eslint/consistent-type-definitions */

interface ImportMetaEnv {
	readonly VITE_CDN_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
	export interface ProcessEnv {
		readonly PRODUCTION_BRANCH: string;
		readonly CUSTOM_DOMAIN: string;
	}
}
