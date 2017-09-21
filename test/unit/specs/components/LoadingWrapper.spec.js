import Vue from 'vue'
import { mount } from 'avoriaz'
import VueX from 'vuex'
import 'babel-polyfill'
import LoadingWrapper from '@/components/LoadingWrapper'
import components from '@/components'

Vue.use(VueX)

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name])
})

describe('LoadingWrapper.vue', () => {
  /*
   * the loading wrapper has a few different states,
   * this loops over all of them and checks that only
   * the correct one is visible
   */
  const checkRendered = (wrapper, states) => {
    Object.keys(states).forEach((qaKey) => {
      const el = wrapper.find(`[data-qa=${qaKey}]`)
      if (states[qaKey]) {
        expect(el.length).to.equal(1)
      } else {
        expect(el.length).to.equal(0)
      }
    })
  }

  it('should render the "loading" state', () => {
    const store = new VueX.Store({
      state: {
        user: 'test',
        loading: true,
        data: []
      }
    })
    const wrapper = mount(LoadingWrapper, { store })

    checkRendered(wrapper, {
      'state-loaded': false,
      'state-no-data': false,
      'state-error': false,
      'state-loading': true
    })
  })

  it('should render the loaded list', () => {
    const store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: [{ repo: 11 }, { repo: 12 }]
      }
    })
    const wrapper = mount(LoadingWrapper, { store })

    checkRendered(wrapper, {
      'state-loaded': true,
      'state-no-data': false,
      'state-error': false,
      'state-loading': false
    })
  })

  it('should render the data when it is an object', () => {
    const store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: { repo: 11 }
      }
    })
    const wrapper = mount(LoadingWrapper, { store })

    checkRendered(wrapper, {
      'state-loaded': true,
      'state-no-data': false,
      'state-error': false,
      'state-loading': false
    })
  })

  it('should render "no data available"', () => {
    const store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: []
      }
    })
    const wrapper = mount(LoadingWrapper, { store })

    checkRendered(wrapper, {
      'state-loaded': false,
      'state-no-data': true,
      'state-error': false,
      'state-loading': false
    })
  })

  it('should render a loading error', () => {
    const store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: [],
        error: 'No data returned'
      }
    })
    const wrapper = mount(LoadingWrapper, { store })

    checkRendered(wrapper, {
      'state-loaded': false,
      'state-no-data': false,
      'state-error': true,
      'state-loading': false
    })
  })
})
