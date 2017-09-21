import Vue from 'vue'
import { mount } from 'avoriaz'
import VueX from 'vuex'
import 'babel-polyfill'
import ListRepos from '@/components/ListRepos'
import components from '@/components'

Vue.use(VueX)

Object.keys(components).forEach((name) => {
  Vue.component(name, components[name])
})

describe('ListRepos.vue', () => {
  let store
  let calls

  beforeEach(() => {
    calls = []
    store = new VueX.Store({
      state: {
        user: 'test',
        loading: false,
        data: [{
          'name': 'repo1',
          'full_name': 'test/repo1'
        }, {
          'name': 'second-repo',
          'full_name': 'test/second-repo'
        }]
      },
      actions: {
        detail: function () {
          calls.push(arguments)
        }
      }
    })
  })

  it('should render a list of repos', () => {
    const wrapper = mount(ListRepos, { store })
    const lis = wrapper.find('li')

    expect(lis.length).to.equal(2)
    // the repo names should be rendered in text
    expect(lis[0].text()).to.contain('repo1')
    expect(lis[1].text()).to.contain('second-repo')
  })

  it('should call the "detail" action on list item click', () => {
    const wrapper = mount(ListRepos, { store })
    const lis = wrapper.find('li')
    expect(lis.length).to.equal(2)

    lis[0].trigger('click')
    expect(calls.length).to.equal(1)
    // repo name should be passed as the 2nd argument
    // to the detail action
    expect(calls[0][1]).to.equal('test/repo1')
  })
})
