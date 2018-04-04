<template>
  <div class="buildnew">
    <header> <span> <img @click="buildnew=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 新建门店 </span></header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="font-family:'xh';" >
      <el-form-item label="门店类型" prop="type">
        <el-radio-group v-model="sizeForm.resource" size="medium">
          <el-radio border label="直营店"></el-radio>
          <el-radio border label="加盟店"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="门店编号" prop="num">
        <el-input v-model="ruleForm.num" placeholder="请根据门店的编码规则,输入门店编号"></el-input>
      </el-form-item>
      <el-form-item label="门店名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入门店名称,如：南京路店"></el-input>
      </el-form-item>
      <el-form-item label="门店电话" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入门店联系电话"></el-input>
      </el-form-item>
      <el-form-item label="门店地址" prop="region" style="position:relative">
        <el-select v-model="ruleForm.prov" placeholder="选择省份">
          <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="ruleForm.city" placeholder="选择市">
          <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="ruleForm.dist" placeholder="选择区">
          <el-option v-for="item in district" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input placeholder="请输入详细地址,如xxx路xx号" v-model="input10" clearable></el-input>
        <el-button type="text" style="position:absolute;bottom:-13px;right:-69px;color:red;font-size:18px;" @click="">获取经纬度</el-button>
      </el-form-item>
      <el-form-item label="经纬度" prop="location">
        <el-input placeholder="请输入经度,如121.23.45" v-model="ruleForm.location.longitude" style="width:49%;">
          <template slot="prepend">东经</template>
        </el-input>
        <el-input placeholder="请输入维度,如31.14.10" v-model="ruleForm.location.latitude" style="width:49%;position:absolute;right:0">
          <template slot="prepend">北纬</template>
        </el-input>
      </el-form-item>
      <el-form-item label="区域分组" prop="group">
        <el-input v-model="ruleForm.group" placeholder="请选择门店所在的区域分组"></el-input>
      </el-form-item>
      <span style="width: 110%;height: 1px;background: #F0F0F0;display: block;margin-bottom: 20px;margin-left: 30px;"></span>
      <el-form-item label="店长" prop="shopmanager">
        <el-input v-model="ruleForm.shopmanager" placeholder="请输入店长姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="shopmanager">
        <el-input v-model="ruleForm.shopmanager" placeholder="请输入店长联系电话"></el-input>
      </el-form-item>
      <el-form-item label="门店账号" prop="accountnum" required>
        <el-input type="text" v-model="ruleForm.accountnum" placeholder="请输入门店账号,用于门店登录后台和POS"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="pwd" required>
        <el-input type="text" v-model="ruleForm.pwd" placeholder="000000"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" style="background:#535353;color:#fff;border-radius:0;border:none;">新建门店</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        integral1:'',
        integral2:'',
        input10:'',
        balance1:'',
        balance2:'',
        province: [{
          id:'1',
          value: '选项1',
          label: '黄金糕'
        }, {
          id:'2',
          value: '选项2',
          label: '双皮奶'
        }],
        city: [{
          id:'1',
          value: '选项1',
          label: '黄金糕',
          pid:'1',
        }, {
          id:'2',
          value: '选项2',
          label: '双皮奶',
          pid:'1',
        }, {
          id:'3',
          value: '选项3',
          label: '蚵仔煎',
          pid:'2',
        }],
        district: [{
          id:'1',
          value: '选项1',
          label: '黄金糕'
        }, {
          id:'2',
          value: '选项2',
          label: '双皮奶'
        }, {
          id:'3',
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: '',
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm: {
          accountnum:'',
          pwd:'',
          shopmanager:'',
          location:{
            longitude:'',
            latitude:''
          },
          group:'',
          num: '',
          phone: '',
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          resource: '',
          desc: '',
          dist:'',
          prov:'',
          city:''
        },
        rules: {
          num: [
            { required: true, message: '请输入门店编号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],

          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        buildnew:false,
        input: '',
        total:100,
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
        leveltable:[{
          name:'',
          cardnum:'',
          level:''
        }],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions: [],
        selectedOptions2: []
      };
    },

  }
</script>
<style lang="scss">
  .buildnew{
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
  }
</style>
