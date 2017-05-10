<template>
  <div id="app">
    <settings></settings>
    <main-view></main-view>
  </div>
</template>

<script>
  import MainView from 'components/mainView'
  import Settings from './config/settings.vue'
  import store from './vuex/store'
  export default {
    components: {
      MainView,
      Settings,
    },
    store
  }
</script>

<style>
</style>
