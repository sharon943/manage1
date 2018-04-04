<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@font-face {
  font-family: 'xh';
  src: url('./assets/font/方正兰亭纤黑_GBK.ttf');
}
@font-face {
  font-family: 'zy';
  src: url("./assets/font/方正准圆简体.ttf");
}
#app{
  height:100%;
}
*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  font-size: .16rem;
  font-family: 'xh';
}
html,body{
  width: 100%;
  height: 100%;
}
</style>
