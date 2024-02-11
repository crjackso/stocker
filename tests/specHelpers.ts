import { shallowMount, mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

global.mountedComponent = (component, options) => {
  options = {
    global: {
      plugins: [vuetify, ...(options?.global?.plugins || [])]
    },
    ...options
  }

  return mount(component, options)
}

global.shallowMountedComponent = (component, options) => {
  options = {
    global: {
      plugins: [vuetify, ...(options?.global?.plugins || [])]
    },
    ...options
  }

  return shallowMount(component, options)
}
