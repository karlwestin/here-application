<!--
This component lists the repositories of a github user,
and switches to the detail view when a components name is clicked
-->

<template>
  <div>
    <h1>Repositories for user: {{ user }}</h1>

    <LoadingWrapper>
        <li class='list-item item-blue item-flex' v-for="repo in data" @click="detail(repo.full_name)">
          <div class='left'>{{repo.name}}</div> <div class="item-star-count">&#x2605; {{ repo.stargazers_count }}</div>
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

<style>
.left {
  text-align: left;
}
.item-flex {
  display: flex;
  justify-content: space-between;
}

.item-blue {
  cursor: pointer;
  background-color: #38155b;
  color: #fff;
  font-weight: bold;
}

.item-star-count {
  background-color: #eee;
  color: #38155b;
  padding: 2px 10px;
  border-radius: 15px;
}
</style>
