<--
component that delays sending an input value until the user has stopped typing
-->

<template>
  <input
    type="text"
    v-bind:id="name"
    v-bind:value="text"
    v-on:input="sendValue($event.target.value)">
</template>


<script>
function debounce (handler, time = 500) {
  let cancel
  return function (val) {
    clearTimeout(cancel)
    cancel = setTimeout(handler.bind(this), time, val)
  }
}

export default {
  name: 'DelayedTyping',
  props: ['handler', 'text', 'name'],
  methods: {
    sendValue: debounce(function (value) {
      this.handler(value)
    })
  }
}
</script>
