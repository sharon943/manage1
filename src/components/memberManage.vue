<template>
  <div class="membermanage">
    <head-top></head-top>
    <div class="main">
      <main>
        <section class="menu">
          <h1 style="color:#D1D1D1">基础数据</h1>
          <h1 :class="{active:activeindex===0}" @click="activeindex=0">会员管理</h1>
          <h1 :class="{active:activeindex===1}" @click="activeindex=1">会员等级</h1>
          <h1 :class="{active:activeindex===2}" @click="activeindex=2">用户画像</h1>
          <h1 style="color:#D1D1D1">基础操作</h1>
          <h1 :class="{active:activeindex===3}" @click="activeindex=3">会员充值</h1>
          <h1 :class="{active:activeindex===4}" @click="activeindex=4">消费结账</h1>
          <h1 :class="{active:activeindex===5}" @click="activeindex=5">合并转移</h1>
          <h1 :class="{active:activeindex===6}" @click="activeindex=6">配置协议</h1>
        </section>
        <section class="data">
          <member v-if="activeindex===0"></member>
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
  import member from './member'
  import memlevel from './memlevel'
  import Recharge from './Recharge'
  import pay from './Pay'
  import mergeAtrans from './mergeAtrans'
  import protocol from './protocol'
  export default{
    name:'shopManage',
    data(){
      return{
        menu:['基础数据','门店管理','区域分组','区域统计'],
        activeindex:0,
        seen:true
      }
    },
    components:{
      headTop,
      member,
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
