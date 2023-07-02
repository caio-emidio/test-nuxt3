// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sfxcode/nuxt-primevue',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@vueuse/nuxt',
    "@vitejs/plugin-vue",
  ],
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'pt', file: 'pt.json', name: 'Portuguese' }
    ],

    vueI18n: './vue-i18n.options.ts'

  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: false,
    icons: {
      scale: 1.2
    },
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50']
    ]
  },
  primevue: {
    config: {
      ripple: true
    }
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore' // import { defineStore } from 'pinia'
    ]
  },
  runtimeConfig: {
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    public: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    },
  },
  build: {
    transpile: ['nuxt', 'primevue']
  },
  devtools: { enabled: true },
});
