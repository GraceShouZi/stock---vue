<template>
  <div id="app">
  	<div class="topNav_placeholder"></div>
    <router-view></router-view>   
    <topNav></topNav>
  </div>
</template>

<script>
import topNav from './components/topNav'
export default {
  name: 'app',
  components:{topNav}
}
</script>

<style>
.topNav_placeholder{ height: 3.4rem; }
</style>
