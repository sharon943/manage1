<template>
  <div>

    <el-form v-show="view" :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="margin-top: 50px;padding: 0 20px;">
      <el-form-item label="账号" prop="name"  :rules="[
      { required: true, message: '账号不能为空'},
    ]">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass" :rules="[
      { required: true, message: '密码不能为空'},
    ]">

        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" style="margin-left: -50px;">登录</el-button>
      </el-form-item>
    </el-form>
    <iframe id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src=src1 style="width:100%；height:100%"></iframe>
  </div>
</template>
<script>
  function GetRequest() {
    var url = "https://api.vi-ni.com/LittleGameLogin/376?redirect_url=http://u131183.s.dd24center.com/web/game/game_id/1372981886&game_id=1372981886"

    //var url = location.href; //获取url中含"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.split("?");
      //截取？之前的数据   截取出门店Id
      var ProcessingValue1 = str[0].slice(38);
      theRequest[0]  =  ProcessingValue1;
      //处理  ？ 之后的参数
      var strs1 = str[1];
      var list = strs1.split("&");
      for(var i = 0; i < list.length; i ++) {
        theRequest[
          list[i].split("=")[0]
          ]=unescape(
          list[i].split("=")[1]
        );
      }
      theRequest["game_id"] = theRequest["game_id"].split("#")[0];

    }
    return theRequest;
  }
  var Request = new Object();
  // 处理后的值集合
  Request = GetRequest();
  export default {
    name: 'new',
    data() {
      return {
        src1: 'https://www.baidu.com',
        view:true,
        ruleForm2: {
          name: '',
          pass: '',
        },
        api: 'http://localhost:8081/'
      };
    },
    methods: {
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       var brandId = Request[0];
      //       var redirectUrl = Request["redirect_url"];
      //       var ga
    },
  }
</script>
