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
      <li class='list-item item-grey'>No data to display</li>
    </ul>
    <ul data-qa="state-error" v-else-if="error">
      <li class='list item item-error'>
        <h2>Something went wrong :(</h2>
        <p>{{error}}</p>
      </li>
    </ul>
    <ul data-qa="state-loading" v-else>
      <li class='list-item item-transparent'>Loading data...</li>
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

<style>
  .item-grey {
    background-color: #555;
    color: #fff;
  }

  .item-error {
    color: #fff;
    background-color: #700606;
  }
</style>
