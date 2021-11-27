/// <reference types="react" />

declare module "*.module.css" {
	const classNames: { readonly [key: string]: string };
	export default classNames;
}

declare module "*.module.scss" {
	const classNames: { readonly [key: string]: string };
	export default classNames;
}

declare module "*.css" {
	export {};
}

declare module "*.scss" {
	export {};
}

declare module "*.svg" {
	export const ReactComponent: React.ComponentType;
	const url: string;
	export default url;
}