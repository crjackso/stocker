import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, fa } from 'vuetify/iconsets/fa-svg'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    surface: '#FFFFFF',
    primary: '#192F82',
    secondary: '#61A083',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme
      }
    },
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
