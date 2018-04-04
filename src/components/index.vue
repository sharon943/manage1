<template>
   <div style="height: 100%;">
     <head-top></head-top>
     <div class="side-container">
       <section class="top">
         <span v-for="(item,index) in top" :class="{active:activeindex===index}" @click="activeindex=index">{{item}}</span>
       </section>
       <section class="bottom">
         <div class="person"></div>
         <div class="mail"></div>
         <div class="write"></div>
         <div class="print"></div>
       </section>
     </div>

     <dataPanel v-if="activeindex==0"></dataPanel>
     <servicePanel v-else></servicePanel>
     <!--<section style="width:88px;height:88px;background:#000;"></section>-->
   </div>
</template>

<script>
import headTop from '../config/headTop'
import dataPanel from './dataPanel'
import servicePanel from './servicePanel'

export default {
  name: 'index',
  data(){
    return {
      activeindex:0,
      top:['数据面板','服务面板']
    }
  },
  components:{
    headTop,
    servicePanel,
    dataPanel,
  },
  mounted(){
    // this.$http.post('https://api.vi-ni.com/openapi/v4_1/littleGame/login',{"mobile":"17521007697","redirectUrl":"http://24haowan.shanyougame.com/web/game/game_id/1234","gameId":1234,"password":"111111","brandId":376}).then(mess=>{
    //   console.log('dyr')
    //   console.log(mess.body)
    // })
    var params={"mobile":"17521007697","redirectUrl":"http://24haowan.shanyougame.com/web/game/game_id/1234","gameId":1234,"password":"111111","brandId":376};
    var myHeaders= new Headers();
    myHeaders.append('Content-Type','application/json');
    fetch('https://api.vi-ni.com/openapi/v4_1/littleGame/login',{
      method:'POST',
      headers:myHeaders,
      body:JSON.stringify(params),
    }).then(r=>r.json()).then(d=>{
      console.log(d)
    })

  }

}
</script>
<style scoped lang="scss">
 *{
      margin:0;
      padding: 0;
      list-style: none;
      text-decoration: none;
    }
      body,html{
        width: 100%;
        height:100%;
      }
 .side-container{
   float: right;
   width: 55px;
   height:calc(100% - 55px);
   background: #262626;
   text-align: center;
   position: relative;
   .top{
     width: 100%;
     height:40%;
     span{
       display: block;
       width: 100%;
       height:auto;
       word-wrap: break-word;
       letter-spacing: 20px;
       color:#fff;
       font-size: 20px;
       padding: 35px 17.5px;
     }
     .active{
       background: #EA4646;
     }
   }
   .bottom{
     position: absolute;
     bottom: 0;
     left:0;
     right: 0;
     margin-left: auto;
     margin-right: auto;
     width: 40px;
     height: 40%;
     padding-top: 50px;
     div{
       width: 40px;
       height: 40px;
       background: #77d04b;
       margin-top: 30px;
     }
   }
 }

</style>

