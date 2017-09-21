# repo-listings2

> Vue.js example project for HERE

I generated this project using **Vue-Cli**, so most of the choices around testing setup and build tools come from there.
I think in general the choices that they had made was good, I've worked with webpack and karma a lot on previous projects.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## Reading the code

The application starts in `src/main.js`, where it creates the **VueX** store and renders the top level component.

`App.vue` is the top level component, and is little more than a cheap router

`components/ListRepos.vue` is a component for listing repositories

`components/RepoDetail.vue` displays the language details when the user has picked a repository

`component/LoadingWrapper.vue` a wrapper component used by the 2 above, displays data fetching status loading/error/no-data etc

`store/index.js` is the VueX store, contains the actions for changing the state and fetching data

## What's the TODO's / next steps?

- more/better styles - its very bare bones right now, sorry had no time for this
- display more repository information in the detail view
- use some sort of routing library instead of my own home-built one (had no time for this)
- filtering/sorting the lists
- a selenium test
- cache `fetch` requests, to save github pings/offline mode
- accessibilty walkthrough (for example not use an `<li>` as a click target)
- a unit test setup that does not run in a browser (I'm new to Vue so I'm not sure this is possible, but would be nice)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
