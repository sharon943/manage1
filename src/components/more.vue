<template>
  <div class="membermanage">
    <head-top></head-top>
    <div class="main">
      <main>
        <section class="menu">
          <h1 style="color:#D1D1D1">权限配置</h1>
          <h1 :class="{active:activeindex===0}" @click="activeindex=0">账户管理</h1>
          <h1 :class="{active:activeindex===1}" @click="activeindex=1">权限配置</h1>
          <h1 :class="{active:activeindex===2}" @click="activeindex=2">用户画像</h1>
          <h1 style="color:#D1D1D1">基础配置</h1>
          <h1 :class="{active:activeindex===3}" @click="activeindex=3">支付配置</h1>
          <h1 :class="{active:activeindex===4}" @click="activeindex=4">微商站参数</h1>
          <h1 :class="{active:activeindex===5}" @click="activeindex=5">微信卡券</h1>
          <h1 :class="{active:activeindex===6}" @click="activeindex=6">公众号设置</h1>
          <h1 :class="{active:activeindex===7}" @click="activeindex=7">模板消息配置</h1>
        </section>
        <section class="data">
          <account v-if="activeindex===0"></account>
          <memlevel v-else-if="activeindex===1"></memlevel>
          <Recharge v-else-if="activeindex===3"></Recharge>
          <pay v-else-if="activeindex===4"></pay>
          <mergeAtrans v-else-if="activeindex===5"></mergeAtrans>
          <protocol v-else-if="activeindex===6"></protocol>
        </section>
      </main>

      <side></side>

    </div>
  </div>
</template>
<script>
  import headTop from '../config/headTop'
  import side from '../config/side'
  import account from './account'
  import memlevel from './memlevel'
  import Recharge from './Recharge'
  import pay from './Pay'
  import mergeAtrans from './mergeAtrans'
  import protocol from './protocol'
  export default{
    name:'more',
    data(){
      return{
        menu:['基础数据','门店管理','区域分组','区域统计'],
        activeindex:0,
        seen:true
      }
    },
    components:{
      headTop,
      account,
      side,
      memlevel,
      Recharge,
      pay,
      mergeAtrans,
      protocol
    },
    mounted(){
      // this.$refs.side.style.opacity=0
    },
    method:{

    }
  }
</script>
<style scoped lang="scss">
  .membermanage{
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
