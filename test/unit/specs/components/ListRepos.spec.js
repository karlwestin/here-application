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
  let detailcalls
  let maincalls

  beforeEach(() => {
    detailcalls = []
    maincalls = []
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
          detailcalls.push(arguments)
        },
        main: function () {
          maincalls.push(arguments)
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
    expect(detailcalls.length).to.equal(1)
    // repo object should be passed as the 2nd argument
    // to the detail action
    expect(detailcalls[0][1].full_name).to.equal('test/repo1')
  })

  it('should trigger "main" when the changeUser method is called', () => {
    const wrapper = mount(ListRepos, { store })
    wrapper.vm.changeUser('new-user')

    expect(store.state.user).to.equal('new-user')
    expect(maincalls.length).to.equal(1)
  })
})
