// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ["./app/assets/index.css"],

	compatibilityDate: "2024-11-01",
	// Provide path aliases: $root -> root, # -> shared
	alias: {
		"@": fileURLToPath(new URL("./", import.meta.url)),
		"#": fileURLToPath(new URL("./shared", import.meta.url)),
	},
	// also ensure vite resolves the same alias explicitly (redundant in many setups but safe)
	vite: {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./", import.meta.url)),
				"#": fileURLToPath(new URL("./shared", import.meta.url)),
			},
		},
		plugins: [tailwindcss()],
	},
	nitro: {
		prerender: {
			autoSubfolderIndex: false,
		},
		alias: {
			"@": fileURLToPath(new URL("./", import.meta.url)),
			"#": fileURLToPath(new URL("./shared", import.meta.url)),
		},
		// Required for Prisma with D1 adapter on Cloudflare Workers
		experimental: {
			wasm: true,
		},
	},
});
