// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare_module",

    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  css: ["~/assets/css/main.css"],
  modules: ["nitro-cloudflare-dev", "@nuxt/ui", "@nuxt/test-utils/module"],
});
