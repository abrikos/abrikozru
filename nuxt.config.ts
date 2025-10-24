// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,

    public: {
      devMode: process.env.NODE_ENV !== 'production',
      authExpiration: 3600 * 24 * 30,
      authRefreshBeforeExpiration: 3000,
      authTokenName: 'auth_token',
    }
  },
  modules: [
    'nuxt-mongoose',
    'nuxt-quasar-ui',
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  mongoose: {
    modelsDir: 'models',
  },
  quasar: {
    sassVariables: '~~/public/quazar.variables.sass',
    plugins:['Notify'],
    components: {
      defaults: {
        QCard:{
          flat: true,
          bordered: true
        },
        QBtn: {
          dense: true,
          flat: true,
          noCaps: true
        },
        QSelect: {
          outlined: true,
          dense: true
        },
        QInput: {
          outlined: true,
          dense: true
        }
      }
    },
    iconSet: 'mdi-v7',
    lang: 'ru'

  },
  nitro: {
    storage: {
      picture: {
        driver: "fs",
        base: "./upload/picture",
      },
    },
  },

})
