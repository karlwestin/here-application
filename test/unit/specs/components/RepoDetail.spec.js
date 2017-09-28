import Vue from 'vue'
import { mount } from 'avoriaz'
import VueX from 'vuex'
import 'babel-polyfill'
import RepoDetail from '@/components/RepoDetail'
import components from '@/components'

Vue.use(VueX)

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name])
})

describe('RepoDetail.vue', () => {
  let store
  let calls

  beforeEach(() => {
    calls = []
    store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: {
          'full_name': 'test/repo1',
          'name': 'repo1',
          'languages': {
            'Java': 244,
            'SQL': 123512,
            'Clojure': 4
          }
        }
      },
      actions: {
        main: function () {
          calls.push(arguments)
        }
      }
    })
  })

  it('should render the repo name', () => {
    const wrapper = mount(RepoDetail, { store })

    expect(wrapper.text()).to.contain('repo1')
  })

  it('should render a list of languages', () => {
    const wrapper = mount(RepoDetail, { store })
    const lis = wrapper.find('li')

    expect(lis.length).to.equal(3)
    // the repo names should be rendered in text
    expect(lis[0].text()).to.contain('Java')
    expect(lis[1].text()).to.contain('SQL')
    expect(lis[2].text()).to.contain('Clojure')
  })

  it('should call the "main" action when clicking the link at the bottom', () => {
    const wrapper = mount(RepoDetail, { store })
    const backButton = wrapper.first('[data-qa="back-to-main"]')

    expect(backButton).to.exist
    backButton.trigger('click')
    // check that 'main' action has been called
    expect(calls.length).to.equal(1)
  })
})
