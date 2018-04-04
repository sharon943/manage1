<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="账号">
      <el-input v-model="formInline.user"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formInline.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          pwd: ''
        }
      }
    },
    methods: {
      onSubmit() {
        var user=this.formInline.user
        var pwd=this.formInline.pwd
        var params={"account":'vivo',"password":'111111'}
        console.log(api.baseUrl,JSON.stringify(params))
        console.log('submit!');
        var myHeaders= new Headers();
        myHeaders.append('Content-Type','application/json');
        fetch(api.baseUrl+'/api/employee/login',{
          method:'POST',
          // mode:'no-cors',
          headers:myHeaders,
          // credentials: 'include',
          body:JSON.stringify(params)
        }).then(r=>r.json()).then(d=>{
          console.log(d)
          if(d.code==200){
            localStorage.accessToken=d.accessToken
            api.accessToken=localStorage.accessToken
            console.log(d.accessToken,localStorage.accessToken,api.accessToken)
            this.$router.push({name:'index'})
          }
        })
        // this.$http.post(this.baseUrl+'/api/employee/login',{"account":user,"password":pwd}).then(mess=>{
        //   console.log(mess)
        // })
      }
    }
  }
</script>
<style>

</style>
