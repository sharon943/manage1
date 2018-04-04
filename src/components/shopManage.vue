<template>
<div class="shopManage">
  <head-top></head-top>
  <div class="main">
  <main>
    <section class="menu">
      <h1 style="color:#D1D1D1">基础数据</h1>
      <h1 :class="{active:activeindex===0}" @click="activeindex=0">门店管理</h1>
      <h1 :class="{active:activeindex===1}" @click="activeindex=1">区域分组</h1>
      <h1 :class="{active:activeindex===2}" @click="activeindex=2">区域统计</h1>
    </section>
    <section class="data">
      <shop v-if="activeindex===0"></shop>
      <region v-else-if="activeindex===1"></region>
    </section>
  </main>

      <side></side>

  </div>

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
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        },
        content1: '这里是UE测试1',
        content2: '这里是UE测试2',
        config1: {
          initialFrameWidth: 1600,
          initialFrameHeight: 350,
          wordCount: false,
        },
        config2: {
          autoHeight: false,
          wordCount: false,
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        ue2: "ue2",
        menu:['基础数据','门店管理','区域分组','区域统计'],
        activeindex:0,
        seen:true,
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
   .shopManage{
     width: 100%;
     height: 100%;
     .main{
       width: 100%;
       height:calc(100% - 55px);
       display: flex;
     main{
       width: 100%;
       height:100%;
       display: flex;
    .menu{
      width: 20%;
      height: 100%;
      border-right: 1px solid #EEEEEE;
      text-align: center;
      font-family: 'zy';
      padding-top: 25px;
      h1{
        font-weight: normal;
        margin-bottom: 10px;
        font-size: 18px;
        padding: 15px 0;
        width: 100%;
      }
      .active{
        color: #FF4A4A;
        border-right: 5px solid #FF4A4A;
        box-sizing: border-box;
      }
    }
    .data{
      width: 80%;
      height: 100%;
      padding: 25px 20px 15px;
    }
     }
     }
   }
</style>
