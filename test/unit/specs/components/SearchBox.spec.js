import { mount } from 'avoriaz'
import SearchBox from '@/components/SearchBox'

describe('SearchBox.vue', () => {
  it('renders an input element with an id', () => {
    const wrapper = mount(SearchBox, {
      propsData: { name: 'item' }
    })

    expect(wrapper.getAttribute('id')).to.equal('item')
  })

  it('renders content in the input', () => {
    const wrapper = mount(SearchBox, {
      propsData: { text: 'github-username' }
    })

    expect(wrapper.value()).to.equal('github-username')
  })

  it('triggers the handler function after 500ms', (done) => {
    let callCount = 0
    let lastVal = ''
    const handler = (val) => {
      lastVal = val
      callCount++
    }
    const wrapper = mount(SearchBox, {
      propsData: { handler: handler, text: 'github-username' }
    })

    wrapper.trigger('input')
    expect(callCount).to.equal(0)
    expect(lastVal).to.equal('')

    setTimeout(() => {
      expect(callCount).to.equal(1)
      expect(lastVal).to.equal('github-username')
      done()
    }, 500)
  })
})
