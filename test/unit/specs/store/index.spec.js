import { createStore } from '@/store'

/*
 * A note about testing strategies, mocking how to approach testing
 * things that depend on browser apis
 *
 * The choice of testing strategies are can depend on the project, what
 * the team feel comfortable doing, and about the level of change
 * that the code goes through.
 *
 * I choose here to stub out the 'bottom' layer, the browser **fetch** api,
 * this strategy gives me the some advantages:
 * + i can write 'integration style' tests where i test the VueX actions and verify
 *   their effect on the application state
 *   With this, I can imagine the API from a component perspective. The component wants
 *   to trigger an action, and eventually have an application state changed. This leaves
 *   the tests a little bit open to refactoring of the intermediate steps.
 * + no external tooling needed
 * + at this small application size, i feel that those tests are enough for all the data loading,
 *   so i skip the test for the utils
 * some of the drawbacks are:
 * - i need to faithfully trigger success/errors in my fetch mock
 * - this will need a big rewrite if we change ajax handler,
 *   like using XHR or the universal-fetch module
 *
 * Another strategy would have been to use a module mock kit, like `rewire`
 * and mock out my fetchJSON implementation rather than the browser fetch function
 * would give for example that we could swap out fetch/XHR/request.js without touching those tests.
 * On the other hand, then i would not feel confident in the fetchJSON testing and would write a
 * separate stack of tests for that.
 *
 * Another test strategy is to not test by triggering actions, but by triggering the
 * store mutations instead, and checking their impact on the state. That can be worth looking into
 * when there are more complex mutations.
 */

describe('VueX store actions', () => {
  let oldFetch
  let resolveRequest
  let rejectRequest
  let fetchArgs

  beforeEach(() => {
    oldFetch = window.fetch
    fetchArgs = []
    resolveRequest = null
    rejectRequest = null

    /*
     * this sets up a window.fetch mock that the test can control
     * to test different scenarios, whether:
     *    a) if the request should succeed on the network
     *    b) what the response should be
     */
    window.fetch = (url, settings) => {
      fetchArgs.push([url, settings])

      return new Promise((resolve, reject) => {
        resolveRequest = (ok, data) => {
          resolve({
            ok,
            json: () => Promise.resolve(data)
          })
        }

        rejectRequest = (errorMessage) => {
          reject(new Error(errorMessage))
        }
      })
    }
  })

  afterEach(() => {
    window.fetch = oldFetch
  })

  describe('"main" action', () => {
    it('sets the view to ListRepos', () => {
      const store = createStore()
      store.dispatch('main')

      expect(store.state.view).to.equal('ListRepos')
    })

    it('sets the state to "loading"', () => {
      const store = createStore({ user: 'testuser' })
      store.dispatch('main')

      expect(store.state.loading).to.equal(true)
    })

    it('calls the right url', () => {
      const store = createStore({ user: 'testuser' })
      store.dispatch('main')

      expect(fetchArgs[0][0]).to.equal('https://api.github.com/users/testuser/repos')
    })

    it('loads data for the main view', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('main')

      resolveRequest(true, [{ name: 'myRepo', full_name: 'testuser/myRepo2' }, { name: 'OtherRepo', full_name: 'testuser/OtherRepo' }])

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.data[0].name).to.equal('myRepo')

        done()
      })
    })

    it('emits error if the user is not found', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('main')

      resolveRequest(false, { message: 'User not found' })

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.error).to.equal('User not found')
        done()
      })
    })

    it('emits error if there is a network error', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('main')

      rejectRequest('You are offline :(')

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.error).to.equal('You are offline :(')
        done()
      })
    })
  })

  describe('"detail" action', () => {
    it('sets the view to RepoDetail', () => {
      const store = createStore()
      store.dispatch('detail', 'testuser/repo1')

      expect(store.state.view).to.equal('RepoDetail')
      expect(store.state.repo).to.equal('testuser/repo1')
    })

    it('sets the state to "loading"', () => {
      const store = createStore({ user: 'testuser' })
      store.dispatch('detail', 'testuser/repo1')

      expect(store.state.loading).to.equal(true)
    })

    it('calls the right url', () => {
      const store = createStore({ user: 'testuser' })
      store.dispatch('detail', 'testuser/repo1')

      expect(fetchArgs[0][0]).to.equal('https://api.github.com/repos/testuser/repo1/languages')
    })

    it('loads data for the detail view', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('detail', 'testuser/repo1')

      resolveRequest(true, { 'C++': 110, 'C#': 11 })

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.data['C++']).to.equal(110)

        done()
      })
    })

    it('emits error if the repo is not found', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('detail', 'testuser/repo1')

      resolveRequest(false, { message: 'Repo not found' })

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.error).to.equal('Repo not found')
        done()
      })
    })

    it('emits error if there is a network error', (done) => {
      const store = createStore({ user: 'testuser' })
      const request = store.dispatch('detail', 'testuser/repo1')

      rejectRequest('You are offline :(')

      request.then(() => {
        expect(store.state.loading).to.equal(false)
        expect(store.state.error).to.equal('You are offline :(')
        done()
      })
    })
  })
})
