import { mount, shallowMount } from '@vue/test-utils'
import FiftyTwoWeekDisplay from '~/components/stocks/FiftyTwoWeekDisplay.vue'
let wrapper

describe('FiftyTwoWeekDisplay', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  const fiftyTwoWeekHeader = () => {
    return wrapper?.find('[data-fifty-two-week-header]')
  }

  it('is a Vue instance', () => {
    const wrapper = mount(FiftyTwoWeekDisplay)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('when low and high values are present', () => {
    it('renders the information', () => {
      wrapper = shallowMount(FiftyTwoWeekDisplay, {
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
      wrapper = shallowMount(FiftyTwoWeekDisplay, {
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
      wrapper = shallowMount(FiftyTwoWeekDisplay, {
        props: {
          price: 23.92,
          low: 32.88
        }
      })

      expect(fiftyTwoWeekHeader().exists()).toBe(false)
    })
  })
})

// describe('FiftyTwoWeekDisplay', () => {

//   const fiftyTwoWeekHeader = () => {
//     return wrapper?.find('[data-fifty-two-week-header]')
//   }

//   describe('when low and high values are present', () => {
//     it('renders the information', () => {
//       wrapper = shallowMount(FiftyTwoWeekDisplay, {
//         props: {
//           price: 23.92,
//           low: 17.99,
//           high: 32.88
//         }
//       })

//       expect(fiftyTwoWeekHeader().exists()).toBe(true)
//     })
//   })
// })
