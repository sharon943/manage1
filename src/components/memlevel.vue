<template>
     <div class="memlevel">
       <div v-if="!buildnew">
        <header> <span> <img src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 会员等级 </span> </header>
        <main>
          <nav>
            <section>
              <el-input v-model="input" placeholder="请输入文件名查询" style="width: 250px;"></el-input><el-button style="margin-left:10px;border-radius: 0;background: #eee;color: #6F6F6F">确定</el-button>
            </section>
            <p @click="buildnew=true">新建等级</p>
          </nav>
          <table cellspacing="0" cellpadding="0" >
          <tr>
            <th>序号</th>
            <th>等级名称</th>
            <th>等级折扣</th>
            <th>经验值范围</th>
            <th>经验值有效期</th>
            <th>到期扣除经验值</th>
            <th>最后修改时间</th>
            <th>等级背景图片</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in tableData">
            <td>{{ item.num }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.type }}</td>
            <td>
              <span @click="handleclose(item.id,item.name)">修改</span>
              <span @click="handleclose(item.id,item.name)">删除</span>
            </td>
          </tr>

        </table>
        </main>
       </div>
       <div v-else-if="buildnew">
         <header> <span> <img @click="buildnew=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 新建等级 </span></header>
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="等级名称" prop="name">
             <el-input v-model="ruleForm.name" placeholder="请输入会员等级名称"></el-input>
           </el-form-item>
           <el-form-item label="等级折扣" prop="discount" style="position: relative">
             <el-input v-model="ruleForm.discount" placeholder="请输入会员等级折扣,如8.0"></el-input>
             <span style="position: absolute;right:5px;top: 0;color: #818181;">折</span>
             <p style="display: block;width:100%;height: 20px;background: #FFF9F9;margin-top: 10px;padding-left: 15px;letter-spacing: 1px">*等级享受折扣范围为0-9.9,0折代表全折扣,即消费免单;不设置任何等级折扣则为无折扣</p>
             <p style="display: block;width:100%;height: 35px;background: #FFF9F9;padding-left: 15px;letter-spacing: 1px">*消费100元的订单,会员等级折扣为8.0折,最后付款为100*80%=80元</p>
           </el-form-item>
           <el-form-item label="经验值范围" required>
             <el-col :span="11">
               <el-input v-model="ruleForm.exp1" placeholder="请输入最小值"></el-input>
             </el-col>
             <el-col class="line" :span="2" style="text-align: center;font-size: 24px;">~</el-col>
             <el-col :span="11">
               <el-form-item prop="date2">
                 <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
               </el-form-item>
             </el-col>
           </el-form-item>
           <el-form-item label="活动区域" prop="region" style="position: relative">
               <ul style="width: 100%;height: 100px;border:1px solid #F0F0F0;display: flex;">
                 <li style="padding-left: 20px;width: 50%;">
                   <p>赠送类型</p>
                   <el-select v-model="ruleForm.region" placeholder="请选择赠送类型" style="width:65%;">
                     <el-option label="区域一" value="shanghai"></el-option>
                     <el-option label="区域二" value="beijing"></el-option>
                   </el-select>
                 </li>
                 <li style="padding-left: 20px;width: 50%;">
                   <p>赠送</p>
                   <el-input v-model="ruleForm.exp1" style="width:65%;"></el-input>
                 </li>
               </ul>
             <span style="position: absolute;bottom:0;right:-60px;height: 20px;font-size: 14px;line-height: 20px;text-decoration: underline;color:#FEACA9">添加赠送</span>
           </el-form-item>


           <el-form-item label="等级描述" prop="desc" style="width: 100%;height: 300px;margin-bottom: 80px">
             <div class="edit_container">
               <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" style="height: 300px;">
               </quill-editor>
             </div>
           </el-form-item>
           <el-form-item label="等级背景图片" prop="pwd" required>
             <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
             <span style="display: inline-block">请上传尺寸为740*420px的图片，图片用于会员中心首页展示，点击 <p @click="ShowExample" style="text-decoration: underline;color: #F4A2A5;display: inline-block">查看实例</p> </span>
           </el-form-item>
           <el-form-item>
             <el-button @click="submitForm('ruleForm')" style="background:#535353;color:#fff;border-radius:0;border:none;margin-left: -100px;">新建等级</el-button>
           </el-form-item>
         </el-form>
       </div>
     </div>
</template>
<script>
  import Quill from 'quill'
  import { quillEditor } from 'vue-quill-editor'
  export default{
  data(){
    return{
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
      },
      content1: '这里是UE测试1',
      content2: '这里是UE测试2',
      config1: {
        initialFrameWidth: 1600,
        initialFrameHeight: 350,
        wordCount: false,
      },
      config2: {
        autoHeight: false,
        wordCount: false,
      },
      ue1: "ue1", // 不同编辑器必须不同的id
      ue2: "ue2",
      imageUrl: '',
      buildnew:false,
      input:'',
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
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        desc: '',
        discount:''
      },
      rules: {
        name: [
          { required: true, message: '请输入会员等级名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
          console.log(file.type)
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
          console.log(isJPG)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      makeUeEditor (id) {
        UE.delEditor(id);
        var ue = UE.getEditor(id, {
          autoHeight: false,
          wordCount: false,
        });
        return ue;
      },
        setUeEditor (id, data) {  // 填充富文本
          var ue = UE.getEditor(id);
          ue.addListener("ready", function () {
            ue.setContent(data);
          });
        },
    },

  }
</script>
<style lang="scss">
  .edit_container{
    margin-bottom: 50px;
  }
  .editer{
    height: 350px;
  }
  .submit_btn{
    text-align: center;
  }
  .el-form-item__label {
    font-size: 13px;
  }
  .avatar-uploader{
    display: inline-block;
    margin-right: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.memlevel{
  & > div:nth-of-type(1){

  }
  header{
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    line-height: 45px;
    span{
      display: flex;
      font-size: 20px;
      font-family: 'zy';

    }

  }
  main{
    padding-left: 30px;
    nav{
      margin-top: 20px;
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      line-height: 45px;
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
    table{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    font-family: 'xh';
    tr:nth-of-type(1){
      background: #FAFAFA;
    }
    tr{
      height: 50px;
      font-size: 20px;
      font-family:'xh';
      text-align: center;
      th{
        font-weight: normal;
        color: #CDCDCD;
      }
      th:last-of-type{
        text-align: right;
        padding-right: 20px;
      }
      td{
        color: #636363;
      }
      td:last-of-type{
        padding-right: 20px;
        text-align: right;
        span{
          padding:0 5px;
          color: #C3C3C3;
        }
        span:last-of-type{
          padding-right: 0;
        }
      }
    }
  }
  }
  & > div:last-of-type{

      width: 100%;
      padding-right: 90px;
      header{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: space-between;
        line-height: 45px;
        margin-bottom: 20px;
        padding-left: 30px;

    }
  }
}
</style>
