<!--
This renders a detail view for the repo, with the name,
a list of languages involved and a link back to the repo listing view
-->
<template>
  <div>
    <h1>Stats for repository: {{ repo }}</h1>

    <LoadingWrapper>
        <li class='list-item' v-for="(lines, language) in data">
        {{language}}: {{ lines }} lines
        </li>
    </LoadingWrapper>

    <a @click="main" data-qa="back-to-main">Back to repository listing</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RepoDetail',
  computed: mapState(['data', 'repo']),
  methods: mapActions(['main'])
}
</script>
