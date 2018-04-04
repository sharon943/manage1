<template>
  <div>
     <div v-if="!buildnew"  class="shop">
    <header> <span> <img src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 门店管理 </span> <p @click="buildnew=true">新建门店</p> </header>
    <div class="search">
      <el-input v-model="input" placeholder="请输入门店编号、门店名称进行搜索" style="width:33%;margin-right:20px;border-radius:0"></el-input>
      <div class="block" style="margin-right: 20px;border-radius: 0">
        <el-cascader
          placeholder="请选择区域分组"
          :options="options"
          filterable
          change-on-select
        ></el-cascader>
      </div>
      <el-button type="info" style="background:#EEEEEE;color:#616161;border:none;font-family:'xh';border-radius:0">搜索</el-button>
    </div>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <th>序号</th>
        <th>门店编号</th>
        <th>门店名称</th>
        <th>门店类型</th>
        <th>区域分组</th>
        <th>门店电话</th>
        <th>店长</th>
        <th>门店账号</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in tableData">
        <td>{{ item.num }}</td>
        <td>{{ item.shopnum }}</td>
        <td>{{ item.shopname }}</td>
        <td>{{ item.shoptype }}</td>
        <td>{{ item.group }}</td>
        <td>{{ item.shopphone }}</td>
        <td>{{ item.shopmanager }}</td>
        <td>{{ item.accountnum }}</td>
        <td>
           <span @click="handleclose(item.id,item.shopname)">锁定</span> | <span @click="handleEdit(item.id)">修改</span>
        </td>
      </tr>
    </table>
    <el-pagination style="text-align:right;" v-show="total>10"
      background=red
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
    <div class="buildnew" v-else>
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

        <el-form-item>
          <el-button @click="submitForm('ruleForm')" style="background:#535353;color:#fff;border-radius:0;border:none;">新建门店</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import api from '../api/api'
  export default {
    data() {
      return {

        input10:'',
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
          shopnum:'01025286',
          shopname:'海岸城店',
          shoptype:'直营店',
          group:'深圳地区',
          shopphone: '0755-25685987',
          shopmanager: '杨兴',
          accountnum: '658945',
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
    methods: {
      handleChange(value) {
        console.log(value);
      },
      handleEdit(id) {
        console.log(id);
      },
      handleclose(id,shopname) {
        console.log(id,shopname);
        const h = this.$createElement;
        this.$msgbox({
          title: '锁定提醒',
          message: h('p', null, [
            h('span', null, '锁定后,该门店将不能进行操作交易,处于业务锁定状态,确定锁定'+'“'+shopname+'”?')
          ]),
          showCancelButton: true,
          confirmButtonText: '锁定接口',
          cancelButtonText: '放弃锁定',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
        // if(d!=''|d!=undefined){
        //   location.href='http://gm12345.g.syhaohaowan.com/web/game/game_id/1234?uid\u003d1718878361\u0026nickname\u003d%E6%AE%B5%E4%B8%80%E5%A4%A9\u0026game_id\u003d1234\u0026timestamp\u003d15221438696\u0026token\u003de8b497291e8015edc91bc7d1a537c3d3\u0026appid\u003d51606'
        // }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updateCity() {
        console.log(this.province)
        for (var i in this.province) {
          var obj = this.province[i];
          console.log(obj)
          console.log(this.ruleForm.prov)
          if (obj.label == this.ruleForm.prov) {
            this.city = obj.sub;
            break;
          }
        }
        this.city = this.city[1].name;
      },
      updateDistrict() {
        for (var i in this.city) {
          var obj = this.city[i];
          if (obj.name == this.city) {
            this.district = obj.sub;
            break;
          }
        }
        if(this.district && this.district.length > 0 && this.district[1].name) {
          this.district = this.district[1].name;
        } else {
          this.ruleForm.district = '';
        }
      }
    },
    beforeMount() {
      this.updateCity();
      this.updateDistrict();
    },
    watch: {
      prov() {
        console.log('改变')
        this.updateCity();
        this.updateDistrict();
      },
      city() {
        this.updateDistrict();
      }
    }
  };
</script>
<style scoped lang="scss">
    .shop{
      width: 100%;
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
      .search{
        width: 100%;
        height: 40px;
        display: flex;
        margin-top: 10px;
        overflow: hidden;
        button{
          height: 40px;
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
