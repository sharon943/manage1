<template>
  <div class="servicePanel">
    <section class="data">
      <div>
         <header>  <span>点评数据 <p>(2月）</p> </span> <img src="../assets/img/youjian.png" alt=""></header>
      </div>
    </section>

    <section class="view">

    </section>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    }
  }
</script>
<style scoped lang="scss">
  .servicePanel{
    width: calc(100% - 55px);
    height:calc(100% - 55px);
    display: flex;
    .data{
      width:80%;
      height:100%;
      box-sizing: border-box;
      border-right: 1px solid #F6F6F6;
      div:nth-of-type(1){
        width: 100%;
        height:50%;
        border-bottom: 1px solid #F6F6F6;
        padding: 30px 0;
      }
    }
    .view{
      width: 20%;
      height:100%;

    }
  }
</style>
