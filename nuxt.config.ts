// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ["./app/assets/index.css"],

	modules: ["nitro-cloudflare-dev"],

	compatibilityDate: "2025-11-25",

	// Provide path aliases: $root -> root, # -> shared
	alias: {
		"@": fileURLToPath(new URL("./", import.meta.url)),
		"#": fileURLToPath(new URL("./shared", import.meta.url)),
	},
	nitro: {
		prerender: {
			autoSubfolderIndex: false,
		},
		alias: {
			"@": fileURLToPath(new URL("./", import.meta.url)),
			"#": fileURLToPath(new URL("./shared", import.meta.url)),
		},
		preset: "cloudflare_module",
		cloudflare: {
			deployConfig: true,
			nodeCompat: true,
		},
		// Required for Prisma with D1 adapter on Cloudflare Workers
		experimental: {
			wasm: true,
		},
	},
	vite: {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./", import.meta.url)),
				"#": fileURLToPath(new URL("./shared", import.meta.url)),
			},
		},
		plugins: [tailwindcss()],
		build: {
			sourcemap: false,
		},
	},
});
