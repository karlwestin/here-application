import Vue from 'vue'
import { mount } from 'avoriaz'
import VueX from 'vuex'
import 'babel-polyfill'
import App from '@/App'

Vue.use(VueX)

// Add 2 test components
// to test selecting child component dynamically
Vue.component('Comp1', {
  template: '<div data-qa="component1">Hi</div>'
})

Vue.component('Comp2', {
  template: '<div data-qa="component2">Hi</div>'
})

describe('App.vue', () => {
  it('renders the child component dynamically, based on the "view" key', (done) => {
    const store = new VueX.Store({
      state: {
        view: 'Comp1'
      },
      mutations: {
        view (state, viewName) {
          state.view = viewName
        }
      }
    })
    const wrapper = mount(App, { store })
    let comp1 = wrapper.find('[data-qa="component1"]')
    let comp2 = wrapper.find('[data-qa="component2"]')

    expect(comp1.length).to.equal(1)
    expect(comp2.length).to.equal(0)

    // lets change viewName and test that Comp2 is rendered:
    store.commit('view', 'Comp2')

    // View updates in the DOM are async,
    // so the assertions need to be wrapped in this
    // https://vuejs.org/v2/guide/unit-testing.html#Asserting-Asynchronous-Updates
    Vue.nextTick(() => {
      comp1 = wrapper.find('[data-qa="component1"]')
      comp2 = wrapper.find('[data-qa="component2"]')

      expect(comp1.length).to.equal(0)
      expect(comp2.length).to.equal(1)
      done()
    })
  })
})
