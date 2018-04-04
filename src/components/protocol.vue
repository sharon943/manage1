<template>
  <div class="pay"  v-else-if="leadigIn">
    <header> <span> <img @click="leadigIn=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 配置协议 </span></header>
    <main v-if="activeI==0" style="position: relative">
      <nav>
        <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;">会员协议</p>
        <p @click="activeI=1">会员说明</p>
        <hr>
      </nav>
      <section>
        * 会员协议用于会员注册时同意的会员协议,点击 <p style="text-decoration: underline;color:#FF5B5B;display: inline-block;font-size: 14px;cursor: pointer">查看实例</p>。
      </section>
      <div class="edit_container">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style="height: 300px;">
        </quill-editor>
      </div>
      <el-button @click="onSubmit" style="margin-left: 0;margin-top: 50px;">保存协议</el-button>
    </main>
    <main v-else>
      <nav>
        <p @click="activeI=0" style="border-left: none">会员协议</p>
        <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;border-right: 1px solid #EEEEEE">会员说明</p>
        <hr>
      </nav>
      <section>* 会员说明是辅助补充协议</section>
      <div class="edit_container">
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style="height: 300px;">
        </quill-editor>
      </div>
      <el-button @click="onSubmit" style="margin-left: 0;margin-top: 50px;">保存协议</el-button>

    </main>
  </div>
</template>
<script>
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  export default{
    data(){
      return{
        checkmem:false,
        checkpwd:false,
        tableData: [{
          id:'1',
          num: '01',
          cardnum:'01025286',
          name:'陈华',
          phone:'15935992655',
          level:'星球会员',
          shopphone: '0755-25685987',
          integral: '53',
          balance: '251.20',
        }],
        activeI:'0',
        leadigInData:[],
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          region:''
        },
      }
    },
    components: {
      quillEditor,
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }

    },
    methods:{
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
    }
  }
</script>
<style scoped lang="scss">
  .el-button {
    cursor: pointer;
    background: #535353;
    border: none;
    color: #F6F6F6;
    border-radius: 0;
  }
  .el-select{
    width: 100%;
  }
  .pay{
    header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      line-height: 45px;
      margin-bottom: 20px;
      padding-left: 30px;
      span{
        display: flex;
        font-size: 20px;
        font-family: 'zy';
      }
      p{
        display: block;
        width: 120px;
        height: 45px;
        font-family: 'xh';
        background: #535353;
        color: #fff;
        text-align: center;
        font-size: 18px;
      }
    }
    main{
      padding-left: 30px;
      nav{
        width: 100%;
        height: 45px;
        display: flex;
        font-family: 'zy';
        p{
          width: 100px;
          height: 45px;
          line-height: 45px;
          border:1px solid #EEEEEE; border-top:none;
          background: #FAFAFA;
          text-align: center;
          color:#C9C9C9;font-size: 16px;
          border-right: none;
        }
        hr{
          width: calc(100% - 200px);
          height: 1px;
          margin-top: 43px;
          /*color: #EEEEEE;*/
          border: none;
          border-bottom: 1px solid #EEEEEE;
        }
      }
      section{
        width:100%;background:#FFF9F9;padding-left:15px;overflow: hidden;margin-top: 20px;font-size: 14px;color:#B2B1B1;height:50px;line-height: 50px;
      }
      div{
        margin-top: 20px;width: 100%;
      }

    }
  }
</style>
