<template>
  <div class="loading">
    <div><i></i>加载中...</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {  
    }
  }
}
</script>
<style scoped>
  .loading{ width:100%; text-align: center; line-height: 3rem;color: #aaa;}
  .loading i{ display: inline-block; width:1.2rem; height: 1.2rem; border:0.2rem solid #ccc; border-radius: 50%; border-top: 0.2rem solid transparent; margin-right: 0.4rem; position: relative; top: 0.4rem; font-size:1.2rem; 
    animation:load 0.5s infinite linear; transform-origin: center center;}
  @keyframes load{
    0%{ transform: rotate(0); }
   100%{ transform: rotate(360deg); }
  }
</style>
