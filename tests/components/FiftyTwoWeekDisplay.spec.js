import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import FiftyTwoWeekDisplay from '~/components/stocks/FiftyTwoWeekDisplay.vue'
import stockFactory from '~/tests/factories/stock.factory'

let wrapper

const vuetify = createVuetify({
  components,
  directives
})

const stock = stockFactory.build()

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
        stock
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
        props: { stock }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(true)
    })
  })

  describe('when `low` prop is undefined', () => {
    it('does not render the information', () => {
      wrapper = shallowMountedComponent(FiftyTwoWeekDisplay, {
        props: {
          stock: {
            ...stock,
            fiftyTwoWeekLow: undefined
          }
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(false)
    })
  })

  describe('when `high` prop is undefined', () => {
    it('does not render the information', () => {
      wrapper = shallowMountedComponent(FiftyTwoWeekDisplay, {
        props: {
          stock: {
            ...stock,
            fiftyTwoWeekHigh: undefined
          }
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(false)
    })
  })
})
