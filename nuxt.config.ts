// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
