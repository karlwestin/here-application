<!--
This renders a detail view for the repo, with the name,
a list of languages involved and a link back to the repo listing view
-->
<template>
  <div>
    <h1>Stats for repository: {{ data.name }}</h1>

    <div>
        <h3>Languages Used</h3>
        <LoadingWrapper>
            <li class='list-item' v-for="(lines, language) in data.languages">
            {{language}}: {{ lines }} lines
            </li>
        </LoadingWrapper>
    </div>

    <div>
        <h3>Contributors</h3>
        <LoadingWrapper>
            <li class='list-item' v-for="contributor in data.contributors">
            {{contributor.login}}: {{ contributor.contributions }} contributions
            </li>
        </LoadingWrapper>
    </div>

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
