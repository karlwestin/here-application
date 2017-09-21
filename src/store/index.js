import VueX from 'vuex'
import fetchJSON from '../utils/fetch'
import { userUrl, repoUrl } from '../utils/urls'

export const types = {
  API_LOAD: 'API_LOAD',
  API_SUCCESS: 'API_SUCCESS',
  API_ERROR: 'API_ERROR',
  VIEW_SET: 'VIEW_SET'
}

export const createStore = (initialState = {}) => {
  return new VueX.Store({
    state: Object.assign({
      user: 'heremaps',
      view: 'ListRepos',
      repo: '',
      loading: false,
      error: '',
      data: []
    }, initialState),
    mutations: {
      [types.VIEW_SET] (state, payload) {
        state.view = payload.view
        state.repo = payload.repo
      },
      [types.API_LOAD] (state, payload) {
        state.loading = true
        state.error = ''
        state.data = []
      },
      [types.API_SUCCESS] (state, payload) {
        state.loading = false
        state.error = ''
        state.data = payload.data
      },
      [types.API_ERROR] (state, payload) {
        state.loading = false
        if (payload.error && payload.error.message) { // fetch error, etc
          state.error = payload.error.message
        }
        state.data = []
      }
    },
    actions: {
      load ({ commit, state }, url) {
        commit(types.API_LOAD)

        return fetchJSON(url)
          .then((data) => commit(types.API_SUCCESS, { data }))
          .catch((error) => commit(types.API_ERROR, { error }))
      },
      main ({ commit, dispatch, state }) {
        const url = userUrl(state.user)
        commit(types.VIEW_SET, { view: 'ListRepos', repo: '' })
        return dispatch('load', url)
      },
      detail ({ commit, dispatch }, repo) {
        const url = repoUrl(repo)
        commit(types.VIEW_SET, {
          view: 'RepoDetail',
          repo
        })
        return dispatch('load', url)
      }
    }
  })
}
