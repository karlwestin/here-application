<!--
This component lists the repositories of a github user,
and switches to the detail view when a components name is clicked
-->

<template>
  <div>
    <h1>Repository Listing</h1>

    <div>
      <label for="usersearch">show repos for username:</label>
      <SearchBox
        v-bind:name="'usersearch'"
        v-bind:text="user"
        v-bind:handler="parentHandler" />
    </div>
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
  methods: {
    ...mapActions(['detail']),
    parentHandler (val) {
      this.$store.state.user = val
      this.$store.dispatch('main')
    }
  }
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
