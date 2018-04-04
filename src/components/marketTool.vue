<template>
  <div class="marketTool">
    <head-top></head-top>
  </div>
</template>
<script>
  import headTop from '../config/headTop'
  import side from '../config/side'
  import shop from './shop'
  import region from './region'
  export default{
    name:'shopManage',
    data(){
      return{
        menu:['基础数据','门店管理','区域分组','区域统计'],
        activeindex:'',
        seen:true
      }
    },
    components:{
      headTop,
      shop,
      side,
      region
    },
    mounted(){
      // this.$refs.side.style.opacity=0
    },
    method:{

    }
  }
</script>
<style scoped lang="scss">
  .marketTool{
    width: 100%;
    height: 100%;
  }
</style>
