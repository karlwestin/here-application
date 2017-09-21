<!--
This component lists the repositories of a github user,
and switches to the detail view when a components name is clicked
-->

<template>
  <div>
    <h1>Repositories for user: {{ user }}</h1>

    <LoadingWrapper>
        <li v-for="repo in data" @click="detail(repo.full_name)">
        {{repo.name}} * {{ repo.stargazers_count }}
        </li>
    </LoadingWrapper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ListRepos',
  computed: mapState(['user', 'data']),
  methods: mapActions(['detail'])
}
</script>
