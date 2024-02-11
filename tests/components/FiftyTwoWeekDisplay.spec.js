import { mount, shallowMount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import FiftyTwoWeekDisplay from '~/components/stocks/FiftyTwoWeekDisplay.vue'
let wrapper

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('FiftyTwoWeekDisplay', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  const fiftyTwoWeekHeader = () => {
    return wrapper?.find('[data-fifty-two-week-header]')
  }

  it('is a Vue instance', () => {
    const wrapper = mountedComponent(FiftyTwoWeekDisplay, {
      props: {
        price: 1.99
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  describe('when low and high values are present', () => {
    it('renders the information', () => {
      wrapper = shallowMountedComponent(FiftyTwoWeekDisplay, {
        props: {
          price: 23.92,
          low: 17.99,
          high: 32.88
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(true)
    })
  })

  describe('when `low` prop is undefined', () => {
    it('does not render the information', () => {
      wrapper = shallowMountedComponent(FiftyTwoWeekDisplay, {
        props: {
          price: 23.92,
          high: 32.88
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(false)
    })
  })

  describe('when `high` prop is undefined', () => {
    it('does not render the information', () => {
      wrapper = shallowMountedComponent(FiftyTwoWeekDisplay, {
        props: {
          price: 23.92,
          low: 32.88
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(false)
    })
  })
})
