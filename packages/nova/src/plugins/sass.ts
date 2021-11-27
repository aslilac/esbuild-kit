import type { Plugin } from "esbuild";
import * as fs from "fs/promises";
import sass from "sass";

import { getPath } from "./util.js";

function compileSass(source: string) {
	return new Promise<string>((resolve, reject) =>
		sass.render({ data: source }, (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(result.css.toString("utf-8"));
		}),
	);
}

export default {
	name: "@nova/esbuild-plugin-sass",

	setup: (build) => {
		// This should probably be flaggable at some point? This'd really cause issues if
		// you wanted to use this plugin without the cssModules plugin
		build.onResolve({ filter: /\.module\.scss$/ }, async (args) => ({
			path: getPath(args),
			namespace: "css-module",
			pluginData: {
				source: await compileSass(await fs.readFile(getPath(args), "utf-8")),
			},
		}));

		build.onLoad({ filter: /\.scss$/ }, async (args) => ({
			loader: "css",
			contents: await compileSass(await fs.readFile(args.path, "utf-8")),
		}));
	},
} as Plugin;