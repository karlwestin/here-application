import Vue from 'vue'
import VueX from 'vuex'
import components from './components'
import App from './App.vue'
import { createStore } from './store'

Vue.use(VueX)

const store = createStore({
  user: 'heremaps'
})

// Load the initial repo list
store.dispatch('main')

// Register components
Object.keys(components).forEach((name) => {
  Vue.component(name, components[name])
})

// Render the application
window.app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
