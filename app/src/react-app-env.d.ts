/// <reference types="react-scripts" />
declare module '*.svg';
declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		PUBLIC_URL: string
		REACT_APP_GOOGLE_CLIENT_ID: string
		REACT_APP_BACKEND_URL: string
	}
}