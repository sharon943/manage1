<template>
  <div class="header-container">
     <section class="left">
     	<div class="logo"></div>
     	<h1 class="brand">喜茶</h1>
     	<span>精确用户数据运营平台</span>
     </section>
     <section class="right">
       <router-link :to="{name:'shopManage'}" :class="{active:activeindex==0}" @click="activeindex=0">门店管理</router-link>
       <router-link :to="{name:'memberManage'}" :class="{active:activeindex==1}" @click="activeindex=1">会员管理</router-link>
       <router-link :to="{name:'marketTool'}" :class="{active:activeindex==2}" @click="activeindex=2">营销工具</router-link>
       <router-link :to="{name:'monthReport'}" :class="{active:activeindex==3}" @click="activeindex=3">统计报表</router-link>
       <img @click="more" class="more" src="../assets/img/more.png" alt="">
     </section>
   </div>
</template>
<script>
  export default{
    data(){
       return{
         menu:['门店管理','会员管理','营销工具','统计报表'],
         activeindex:''
       }
    },
    created(){
    	console.log(213213)
    },
    methods:{
      more(){
        alert(1)
        this.$router.push('more')
      }
    }
  }
</script>
<style scoped lang="scss">
.header-container{
	width:100%;
	height:55px;
	background-color:#FAFAFA;
  display: flex;
  justify-content: space-between;
	.left{
	height:100%;
	/*background:red;*/
	display:flex;
  justify-content: space-between;
    color: #9B9B9B;
    line-height: 55px;
    .logo{
      width: 88px;
      height:55px;
      background: #76d04b;
      margin-left: 20px;
      margin-right: 20px;
    }
    h1{
      font-size: 20px;
      color: #000;
      margin-right: 20px;
    }
    span{
      font-size: 16px;
    }
    }
    .right{
      width:47%;
	    height:100%;
	   /*background:blue;*/
      display:flex;
      justify-content: space-between;
      a{
        font-size: 16px;
        color: #9B9B9B;
        line-height: 55px;
        padding:0 20px;
      }
      .router-link-active{
        background: #EA4646;
        color:white;
      }
      .more{
        width: 55px;
        height:55px;
        background: #77d04b;
      }
    }
}

</style>
