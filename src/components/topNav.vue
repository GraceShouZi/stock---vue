<template>
  <div class="top" id="top">
    <p class="logo"><router-link to="first">Logo</router-link></p>
    <ul>  
      <li v-for="(item,index) in toplist" v-bind:class="{on : item.isOn}" v-on:click='topClick(index)'>
        <router-link :to="{path: item.toLink}">
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import Store from '../store'
  export default {
  name: 'FooterNav',
  data () {
    return {
      toplist: [{ 
        toLink:'first',
        name: '策略',
        isOn: true
      },{ 
        toLink:'comment',
        name: '点评', 
        isOn: false
      },{ 
        toLink:'optional',
        name: '自选', 
        isOn: false
      },{ 
        toLink:'mine',
        name: '我的', 
        isOn: false
      }],
      tabIndex:Store.fetch()
    }
  },
  mounted: function () {
      var _this = this;
      var pageIndex = _this.tabIndex;
      console.log(pageIndex)
      for(var i=0; i<_this.toplist.length; i++){
        if(i!=pageIndex){
          _this.toplist[i].isOn = false;
        }else{
          _this.toplist[pageIndex].isOn = true;
        }
      };
      if(pageIndex == 0){
        _this.$router.push({ path: '/first'})
      }else if(pageIndex == 1){
        _this.$router.push({ path: '/comment'})
      }else if(pageIndex == 2){
        _this.$router.push({ path: '/optional'})
      }else{
        _this.$router.push({ path: '/mine'})
      }
  },
  watch:{
    tabIndex:{
      handler:function(tabs){
        Store.save(tabs)
      },
      deep:true
    }
  },
  methods: {
    topClick: function (index) {
      var _this = this;
      _this.tabIndex = index;
      for(var i=0; i<_this.toplist.length; i++){
        if(i != index){
          _this.toplist[i].isOn = false;
        }else{
          _this.toplist[index].isOn = true;
        }
      }
    }
  }  
}
</script>
<style scoped>
.top{ border-bottom: 1px solid #e5e5e5; position: fixed; top: 0;width:100%; height:3.4rem; max-width: 768px; box-sizing:border-box; background: #fff; z-index: 999; overflow:hidden;}
.logo{ float: left; line-height: 3.4rem; padding:0 1rem;color:#FE5252; font-size:1.8rem;}
.logo a{color:#FE5252;}
.top ul{ width:60%; display: flex; float: right;}
.top ul li{ flex:1; line-height:3.2rem; font-size: 1.2rem; text-align:center;}
.top ul .on{ pointer-events: none; }
.top ul .on a{ color:#FE5252;}
</style>

