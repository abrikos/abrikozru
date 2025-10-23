// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    'nuxt-mongoose',
    'nuxt-quasar-ui',
  ],
  mongoose: {
    modelsDir: 'models',
  },
  quasar: {
    lang: 'ru',
    extras: {
      fontIcons: ['material-icons']
    },
    //sassVariables: '~/public/quazar.variables.sass',
    components: {
      defaults: {
        QBtnDropdown: {
          dense: true,
          flat: true,
          noCaps: true
        },
        QBtn: {
          dense: true,
          flat: false,
          noCaps: true
        },
        QInput: {
          outlined: true,
          dense: true,
        },
        QSelect: {
          outlined: true,
          dense: true,
          optionsDense: true
        },
      }
    }
  },
})
