<template>
<div class="data-panel">
   <div class="top">
      <div>
        <div class="title">
          <h1>健康中心 <span>2月</span> </h1>
          <div class="youjian"></div>
        </div>
        <div class="middle">
          <div>
              <span>平均单价 <p>￥46.20</p> <p>< ￥56.70</p><p class="zhishu">指数</p></span>
              <span>人均消费 <p>161.70</p> <p>> 58.20</p><p class="zhishu">指数</p></span>
              <span>人均单数 <p>3.5</p> <p>> 1.8</p><p class="zhishu">指数</p></span>
          </div>
          <div id="line">
            <!--图标-->
          </div>
        </div>
        <div class="bottom">
          <div>
            3698<br>
            活跃客户
          </div>
          <div>
            268.256.00<br>
            余额总数
          </div>
          <div>
            563.256.00<br>
            消费总数
          </div>
        </div>
      </div>
     <div class="user">
       <div class="title">
         <h1>用户画像</h1>
         <div class="youjian"></div>
       </div>
       <div class="middle">
         <div class="user-left">
           <span>门店 <p>海岸城店</p> <p>海雅缤纷城店</p><p>华强九方店</p></span>
           <span>大类 <p>现萃茶</p> <p> 冷泡茶</p><p>霸气鲜果茶</p></span>
           <span>细类 <p>金色山脉</p> <p> 阿里山初雪</p><p>古树普洱</p></span>
         </div>
         <div id="line1">
           <!--图标-->
         </div>
       </div>
       <div class="bottom">
         <div>
           3698<br>
           新客户
         </div>
         <div>
           268.256.00<br>
           二次消费
         </div>
         <div>
           563.256.00<br>
           忠实客户
         </div>
         <div>
           563.256.00<br>
           沉睡客户
         </div>
       </div>
     </div>
   </div>
   <div class="Middle">
    <header>营销中心 <div class="youjian"></div></header>
    <ul>
      <li>
        <span>拉新阶段</span>
        <section>
          <div>
            <p>新客户</p><p>45.6%</p>
          </div>
            <span></span>
          <div>
            <p>新用户</p><p>54.4%</p>
          </div>
        </section>
        <section>推荐：<p>注册送礼+拉新分享</p></section>
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
   <div class="Bottom">
     <table cellpadding="0" cellspacing="0">
       <tr>
        <td>活动名称</td>
        <td>时间</td>
        <td>状态</td>
        <td>参与人数</td>
        <td>拉动金额</td>
        <td>发券数量</td>
        <td>核销数量</td>
       </tr>
       <tr>
         <td>3.8女神节大促活动</td>
         <td>2018-03-01至2018-03-10</td>
         <td>进行中</td>
         <td>256</td>
         <td>1230</td>
         <td>523</td>
         <td>261</td>
       </tr>
       <tr></tr>
       <tr></tr>
     </table>
   </div>
</div>
</template>
<script>
  import echarts from 'echarts/lib/echarts';
  // 引入柱状图
  // import 'echarts/lib/chart/pie';
  // import 'echarts/lib/component/title';
  // import 'echarts/lib/component/legend';

  export default{
     data(){
       return{

       }

     },
     mounted(){

       this.initdata();
       this.initdata1();
     },
     methods:{
       initdata(){
         var echarts = require('echarts');
         var myChart = echarts.init(document.getElementById('line'));
         var base = +new Date(2016, 9, 3);
         var oneDay = 24 * 3600 * 1000;
         var valueBase = Math.random() * 300;
         var valueBase2 = Math.random() * 50;
         var data = [];
         var data2 = [];

         for (var i = 1; i < 10; i++) {
           var now = new Date(base += oneDay);
           var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');

           valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
           valueBase <= 0 && (valueBase = Math.random() * 300);
           data.push([dayStr, valueBase]);

           valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
           valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
           data2.push([dayStr, valueBase2]);
         }

         myChart.setOption({
           animation: false,
           legend: {
             top: 'bottom',
             data:['意向']
           },
           tooltip: {
             triggerOn: 'none',
             position: function (pt) {
               return [pt[0], 130];
             }
           },

           xAxis: {
             type: 'time',
             boundaryGap: true,
             axisPointer: {
               value: '2016-10-7',
               snap: false,
               lineStyle: {
                 color: '#004E52',
                 opacity: 0.5,
                 width: 2
               },
               label: {
                 show: false,
                 formatter: function (params) {
                   return echarts.format.formatTime('yyyy-MM-dd', params.value);
                 },
                 backgroundColor: '#004E52'
               },
               handle: {
                 show: false,
                 color: '#004E52'
               }
             },
             splitLine: {
               show: false
             }
           },
           yAxis: {
             type: 'value',
             axisTick: {
               inside: false
             },
             splitLine: {
               show: false
             },
             axisLabel: {
               inside: false,
               formatter: '{value}\n'
             },
             z: 10
           },
           grid: {
             top: 10,
             left: 15,
             right: 15,
             height: 100
           },
           dataZoom: [{
             type: 'inside',
             throttle: 50
           }],
           series: [
             {
               name:'模拟数据',
               type:'line',
               smooth: true,
               symbol: 'line',
               symbolSize: 5,
               sampling: 'average',
               itemStyle: {
                 normal: {
                   color: '#8ec6ad'
                 }
               },
               stack: 'a',
               areaStyle: {
                 normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                     offset: 0,
                     color: '#8ec6ad'
                   }, {
                     offset: 1,
                     color: '#ffe'
                   }])
                 }
               },
               data: data
             },
             {
               name:'模拟数据',
               type:'line',
               smooth:true,
               stack: 'a',
               symbol: 'line',
               symbolSize: 5,
               sampling: 'average',
               itemStyle: {
                 normal: {
                   color: '#d68262'
                 }
               },
               areaStyle: {
                 normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                     offset: 0,
                     color: '#d68262'
                   }, {
                     offset: 1,
                     color: '#ffe'
                   }])
                 }
               },
               data: data2
             }

           ]

         });
         // this.myChart.setOption(option);
       },
       initdata1(){
         var echarts = require('echarts');
         var myChart = echarts.init(document.getElementById('line1'));
         // app.title = '极坐标系下的堆叠柱状图';

         myChart.setOption({

           angleAxis: {
           },
           radiusAxis: {
             type: 'category',
             data: [],
             z: 10
           },
           polar: {
           },
           series: [{
             type: 'bar',
             data: [ 3, 4],
             coordinateSystem: 'polar',
             name: 'A',
             stack: 'a'
           }, {
             type: 'bar',
             data: [ 6, 8],
             coordinateSystem: 'polar',
             name: 'B',
             stack: 'a'
           }, {
             type: 'bar',
             data: [1, 2],
             coordinateSystem: 'polar',
             name: 'C',
             stack: 'a'
           }],
           legend: {
             show: false,
             data: ['A', 'B', 'C']
           }
         });
       }
     }
   }
</script>
<style scoped lang="scss">
    .data-panel{
      width: calc(100% - 55px);
      height:calc(100% - 55px);
      float:left;
      .top{
        width: 100%;
        height:35%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        div{
          width: 50%;
          position: relative;
          .title{
            width: 100%;height:30px;
            display: flex;
            justify-content: space-between;
            padding:0 50px;
            margin-top: 30px;
            h1{
               font-size: 20px;
               font-weight: normal;
               span{
                font-size: 14px;
                color:#9B9B9B;
               }
            }
            .youjian{
              width:39px;
              height: 20px;
              background: #77d04b;
            }
          }
          .middle{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding:0 50px;
            height: auto;
            .user-left{
              width:60%;
            }
            div{
              width: 48%;

              & > span:nth-of-type(1){
                font-weight: bold;
              }
               span{
                 width: 100%;
                 margin-top: 10px;
                 display: block;
                 width: 100%;
                 font-size: 16px;

                 & > p:nth-of-type(1){
                   margin-left: 20px;
                 }
                 & > .zhishu{
                   font-size: 18px;
                   color:#9B9B9B;
                   margin-left: -10px;
                   margin-right: 0px;
                   font-weight: normal;
                 }
                 p{
                  display: inline-block;
                   font-size: 16px;
                   margin-right: 20px;
                 }
               }

            },
             #line{
               height: 120px;
             }
          }
          .bottom{
            width: 100%;
            height:55px;
            /*position: absolute;bottom: 0;left:0;*/
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            div{
              width: 33.1%;
              height:100%;
              background: #FAFAFA;
              border-bottom: 2px solid #F6F6F6;
              text-align: center;
              font-size: 16px;
              padding-top: 10px;
            }
          }
        }
        .user{
          .bottom{
            div{
              width: 24.8%;
            }
          }
        }
        & > div:nth-of-type(1){
          border-right: 2px solid #F6F6F6;
        }

      }
      .Middle{
        width: 100%;
        height:30%;

        header{
          width: 100%;
          height:20px;
          font-size: 20px;
          color:#535353;
          display: flex;
          justify-content: space-between;
          padding:0 50px;
          .youjian{
            width:39px;
            height: 20px;
            background: #77d04b;
          }
        }
        ul{
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          li{
            width: 24%;
            height: 100%;
            border-right: 1px solid #EEEEEE;
            span{
              display: block;
              width: 100%;
              text-align: center;
              height: 25px;
              font-size: 20px;
              color:#535353;
              margin-top: 15px;
            }
            section{
              width:100%;
              display: flex;
              padding: 0 90px;
              text-align: center;
              margin-top: 20px;
              div{
                width: 100px;
                height: 80px;
                p{
                  line-height: 40px;
                  font-size: 14px;
                  color:#000;
                  text-align: left;
                }
                p:nth-of-type(1){
                  width: 100%;
                  height: 50%;
                  color:#AEAEAE;
                  border-bottom: 1px dashed #BFBFBF;
                }
              }
              div:nth-of-type(2){
                p{
                  text-align: right;
                }
              }
              span{
                width:50px;
                height: 50px;
                background: red;
                border-radius: 50%;
                margin-top: 15px;
                /*margin-left: 30px;*/
              }
            }
            section:nth-of-type(2){
              margin-left: -20px;
              color: #DCDCDC;
              p{
                color: #898989;
              }
            }
          }
          li:last-of-type{
            border-right:none;
          }
        }
      }
      .Bottom{
        table{
          width: 100%;
          height:100px;
          padding:0 50px;

          tr{
            width: 100%;height:40px;
            td{
              text-align: center;
              color:#AEAEAE;
              font-size: 18px;
              line-height: 40px;
            }
            td:nth-of-type(1){
               text-align: left;
            }
            & > td:nth-of-type(4),& > td:nth-of-type(5),& > td:nth-of-type(6),& > td:nth-of-type(7){
               color:#000;
             }
            td:last-of-type{
              text-align: right;
            }
          }
          tr:nth-of-type(1){
            background: #FAFAFA;
            & > td{
              width: auto;
              color:#AEAEAE;
            }
          }

        }
      }
    }
</style>
