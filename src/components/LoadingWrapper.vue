<!--
This is a wrapper around the 2 list components that this application has
It shows the states loading/error/no data,
and if data has been successfully loaded, it shows the list that the RepoDetail and the ListRepos
components are rendering
-->
<template>
  <div>
    <ul data-qa="state-loaded" v-if="!loading && (data.length || Object.keys(data).length)">
      <slot></slot>
    </ul>
    <ul data-qa="state-no-data" v-else-if="!loading && !error && !data.length">
      <li>No data to display</li>
    </ul>
    <ul data-qa="state-error" v-else-if="error">
      <li>
        <h2>Something went wrong :(</h2>
        <p>{{error}}</p>
      </li>
    </ul>
    <ul data-qa="state-loading" v-else>
      <li>Loading data...</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LoadingWrapper',
  computed: mapState(['loading', 'error', 'data'])
}
</script>
