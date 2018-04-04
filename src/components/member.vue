<template>
  <div>
    <div v-if="!buildnew&!recordView&!modiView&!leadigIn" class="shop">
      <header> <span> <img src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 会员管理 </span> <span><p @click="leadigIn=true" style="margin-right: 5px;width: 140px;background: #fff;border:1px solid #535353;color:#535353;">批量导入会员卡</p> <p @click="buildnew=true">新建会员</p></span>  </header>
      <div class="search">
        <el-input v-model="input" placeholder="请输入卡号、姓名、手机号搜索" style="width:20%;margin-right:20px;border-radius:0"></el-input>
        <div class="block" style="margin-right: 20px;border-radius: 0">
          <el-cascader placeholder="请选择会员等级" :options="options" filterable change-on-select></el-cascader>
        </div>
        <span>积分：<el-input v-model="integral1" style="width:70px;"></el-input> ~ <el-input v-model="integral2" style="width:70px;"></el-input></span>
        <span>余额：<el-input v-model="balance1" style="width:70px;"></el-input> ~ <el-input v-model="balance2" style="width:70px;"></el-input></span>
        <el-button type="info" style="background:#EEEEEE;color:#616161;border:none;font-family:'xh';">确定</el-button>
      </div>
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th>序号</th>
          <th>卡号</th>
          <th>门店名称</th>
          <th>手机</th>
          <th>会员等级</th>
          <th>经验值</th>
          <th>积分</th>
          <th>余额</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tableData">
          <td>{{ item.num }}</td>
          <td>{{ item.cardnum }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.level }}</td>
          <td>{{ item.shopphone }}</td>
          <td>{{ item.integral }}</td>
          <td>￥{{ item.balance }}</td>
          <td>
            <span @click="handleclose(item.id,item.name)">锁定</span> | <span @click="handleEdit(item)">修改</span> |<span @click="handlerecord(item.id)">交易记录</span> |<span @click="handlelevel(item.id,item.name,item.cardnum,item.level)">等级升降</span>
          </td>
        </tr>
      </table>
      <el-pagination style="text-align:right;" v-show="total>10" type=info background layout="prev, pager, next" :total="total"></el-pagination>
      <section v-show="dialogFormVisible" style="padding: 10px 20px;box-shadow: 0 0 10000px 10000px rgba(0,0,0,0.5);background:white;width:25%;height: 500px;position: fixed;top:0;bottom:0;left:0;right: 0;margin:auto;">
        <header> <p style="background:transparent;color: #000;text-align: left;">等级升降</p> <img src="../assets/img/cha_03.png" alt="" style="width: 18px;height: 18px;margin-top: 10px;" @click="dialogFormVisible=false"> </header>
        <main style="width: 100%;height: 85%;padding: 0 10px;margin-top: 10px;">
         <div style="background: #FFF9F9;font-family:'xh';font-size: 14px;display: block;width: 100%;margin-bottom: 20px;">* 在升级会员后,会员将会得到相应的等级升级奖励,不能退回。请谨慎操作！</div>
          <span>会员姓名 <input type="text" :value="leveltable.name" disabled="disabled"></span>
          <span>会员卡号 <input type="text" :value="leveltable.cardnum" disabled="disabled"></span>
          <span>当前等级 <input type="text" :value="leveltable.level" disabled="disabled"></span>
          <span>升降等级
            <select name="selected">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </select>
          </span>
          <section>
            <span @click="dialogFormVisible=false">不保存</span>
            <span @click="save">保存修改</span>
          </section>
        </main>
     </section>
    </div>
    <div v-else-if="buildnew" class="buildnew">
      <header> <span> <img @click="buildnew=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 新建会员 </span></header>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="font-family:'xh';" >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="ruleForm.name" placeholder="请输入会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="卡号" prop="num" required>
          <el-input v-model="ruleForm.num" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="ruleForm.phone" placeholder="请输入会员手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="Id">
          <el-input v-model="ruleForm.Id" placeholder="请输入会员身份证号"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="region" style="position:relative">
          <el-select v-model="ruleForm.year" placeholder="年">
            <el-option v-for="item in yeararr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="ruleForm.mon" placeholder="月">
            <el-option v-for="item in monarr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="ruleForm.day" placeholder="日">
            <el-option v-for="item in dayarr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd" required>
          <el-input v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" style="background:#535353;color:#fff;border-radius:0;border:none;">新建门店</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="recordView" class="recordView">
      <header> <span> <img @click="recordView=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 交易记录 </span></header>
      <main>
      <span>* 消费超过第二天5点将无法退单</span>
      <el-select v-model="Btype" placeholder="请选择交易类型" style="width: 20%;border-radius: 0"><el-option v-for="item in Btypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="Bshop" placeholder="请选择门店" style="width: 20%;border-radius: 0"><el-option v-for="item in Bshops" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker style="border-radius: 0;margin-left: 10px;height: 50px;line-height: 50px" v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
      <el-button style="border-radius:0;background:#EEEEEE;border:none;margin-left: 10px;">确定</el-button>

      <table cellspacing="0" cellpadding="0">
        <tr>
          <th>序号</th>
          <th>交易时间</th>
          <th>交易类型</th>
          <th>门店名称</th>
          <th>交易金额</th>
          <th>交易明细</th>
          <th>交易积分</th>
          <th>使用优惠</th>
          <th>卡内余额</th>
          <th>卡内积分</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in tableData">
          <td>{{ item.num }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.level }}</td>
          <td>{{ item.shopphone }}</td>
          <td>{{ item.integral }}</td>
          <td>￥{{ item.balance }}</td>
          <td>￥{{ item.balance }}</td>
          <td>￥{{ item.balance }}</td>
          <td>
            <span @click="handleclose(item.id,item.name)">退单</span>
          </td>
        </tr>
      </table>
      </main>
    </div>
    <div v-else-if="modiView">
      <header> <span> <img @click="modiView=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 修改会员信息 </span></header>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="font-family:'xh';" >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="modidata.name" placeholder="请输入会员姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="modidata.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="卡号" prop="num" required>
          <el-input v-model="modidata.num" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="modidata.phone" placeholder="请输入会员手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="Id">
          <el-input v-model="modidata.Id" placeholder="请输入会员身份证号"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" style="position:relative">
          <el-select v-model="modidata.year" placeholder="年">
            <el-option v-for="item in yeararr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="modidata.mon" placeholder="月">
            <el-option v-for="item in monarr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="modidata.day" placeholder="日">
            <el-option v-for="item in dayarr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd" required>
          <el-input v-model="modidata.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')" style="background:#535353;color:#fff;border-radius:0;border:none;">新建门店</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="leadingin"  v-else-if="leadigIn">
      <header> <span> <img @click="leadigIn=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 批量导入会员卡 </span></header>
      <main v-if="activeI==0" style="position: relative">
        <nav>
          <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;">导入会员</p>
          <p @click="activeI=1">导入记录</p>
          <hr>
        </nav>
        <section style="width: 100%;display: flex;justify-content: space-between;margin-top: 20px;">
          <div style="display: flex;justify-content: space-between;position: relative">
            <span style="text-align: center;color:#F6F6F6;background: #535353;width: 140px;height: 45px;line-height: 45px;font-size: 16px;font-family:'zy';">上传导入模板</span>
            <p style="text-decoration: underline;position:absolute;bottom: 1px;left: 150px;width: 100px">下载批量导入模板</p>
          </div>
          <div style="display: flex;justify-content: space-between;position: relative;">
            <el-checkbox v-model="checkmem" style="position: absolute;bottom:0;left:-200px;">锁定会员卡</el-checkbox>
            <el-checkbox v-model="checkpwd" style="position: absolute;bottom:0;left:-120px">随机密码</el-checkbox>
            <span style="text-align: center;color:#F8F8F8;background: #DCDCDC;width: 140px;height: 45px;line-height: 45px;font-size: 16px;font-family:'zy';">导入会员</span>
          </div>
        </section>
        <table cellspacing="0" cellpadding="0" >
          <tr>
            <th>序号</th>
            <th>交易时间</th>
            <th>交易类型</th>
            <th>门店名称</th>
            <th>交易金额</th>
            <th>交易明细</th>
            <th>交易积分</th>
            <th>使用优惠</th>
            <th>卡内余额</th>
            <th>卡内积分</th>
            <th>操作</th>
          </tr>
          <tr  v-if="leadigInData.length>0" v-for="(item,index) in tableData">
            <td>{{ item.num }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.shopphone }}</td>
            <td>{{ item.integral }}</td>
            <td>￥{{ item.balance }}</td>
            <td>￥{{ item.balance }}</td>
            <td>￥{{ item.balance }}</td>
            <td>
              <span @click="handleclose(item.id,item.name)">退单</span>
            </td>
          </tr>
          <section v-else style="font-size: 16px;font-family: 'zy';overflow:hidden;position: absolute;left:0;right:0;margin-left: auto;margin-right: auto;width:600px;margin-top: 200px;">
              <i class="el-icon-warning" style="font-size: 40px;padding-top: 25px;margin-right: 20px;"></i>暂时没有数据。请先<p style="font-size: 16px;display: inline-block;color:#FF6C6C;text-decoration: underline;">下载批量导入模板</p>，填写完成后，批量导入会员！
          </section>
        </table>

      </main>
    <main v-else>
      <nav>
        <p @click="activeI=0" style="border-left: none">导入会员</p>
        <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;border-right: 1px solid #EEEEEE">导入记录</p>
        <hr>
      </nav>
      <section style="margin-top: 20px;">
        <el-input v-model="input" placeholder="请输入文件名查询" style="width: 250px;"></el-input><el-button style="margin-left:10px;border-radius: 0;background: #eee;color: #6F6F6F">确定</el-button>
      </section>
      <table cellspacing="0" cellpadding="0" >
        <tr>
          <th>序号</th>
          <th>创建时间</th>
          <th>文件名</th>
          <th>操作</th>
        </tr>
        <tr v-if="tableData.length>0" v-for="(item,index) in tableData">
          <td>{{ item.num }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.type }}</td>
          <td>
            <span @click="handleclose(item.id,item.name)">下载</span>
          </td>
        </tr>
        <section v-else style="font-size: 16px;font-family: 'zy';overflow:hidden;position: absolute;left:0;right:0;margin-left: auto;margin-right: auto;width:600px;margin-top: 200px;">
          <i class="el-icon-warning" style="font-size: 40px;padding-top: 25px;margin-right: 20px;"></i>暂时没有数据。请先<p style="font-size: 16px;display: inline-block;color:#FF6C6C;text-decoration: underline;">下载批量导入模板</p>，填写完成后，批量导入会员！
        </section>
      </table>
    </main>
    </div>
  </div>
</template>
<script>
  import newmember from'./newmember'
  import {baseUrl} from '../api/api'
  import api from '../api/api'
  export default {
    data(){
      return {
        checkmem:false,
        checkpwd:false,
        activeI:'0',
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        Btypes: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
        Bshops: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        Btype: '',
        Bshop: '',
        leadigIn:false,
        modiView:false,
        recordView:false,
        recorddata:[],
        modidata: {
          name: '',
          sex:'',
          cardnum:'',
          phone:'',
          Id:'',
          year:'',
          mon:'',
          day:'',
          pwd:'',
        },
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
          Id:'',
          accountnum:'',
          pwd:'000000',
          shopmanager:'',
          sex:'女',
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
          day:'',
          year:'',
          mon:''
        },
        rules: {
          num: [
            { required: true, message: '请输入会员卡号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入会员姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请选择省份', trigger: 'change' }
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
        leadigInData:[],
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
        dayarr: [],
        monarr: [],
        yeararr:[]
      };
    },
    components:{
      newmember,
    },
    mounted(){

    },
    computed:{

    },
    methods: {
      save(){
      },
      handleChange(value) {
        console.log(value);
      },
      handleEdit(item) {
        this.modiView=true
        console.log(item);
          this.modidata.name=item.name;
          this.modidata.sex=item.sex;
          this.modidata.cardnum=item.cardnum;
          this.modidata.phone=item.phone;
          this.modidata.Id=item.Id;
          this.modidata.year=item.year;
          this.modidata.mon=item.mon;
          this.modidata.day=item.day;
          this.modidata.pwd=item.pwd
      },
      handleclose(id,name) {
        console.log(id,name);
        const h = this.$createElement;
        this.$msgbox({
          title: '锁定提醒',
          message: h('p', { style: 'text-align:center' }, [
            h('span', { style: 'color: #636363;text-align:center' }, '锁定后,该会员将不能正常使用会员卡,处于业务锁定状态,确定锁定'+'“'+name+'”会员?')
          ]),
          showCancelButton: true,
          confirmButtonText: '锁定接口',
          cancelButtonText: '放弃锁定',
          // center: true,
          // confirmButtonClass:{background:'red'},
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
      handlerecord(id){
        console.log(localStorage.accessToken)
        this.recordView=true
        console.log(id)
        fetch(api.baseUrl+'/api/trans?cardId=10000000157&pageSize=10&pageIndex=0&start=2018-03-02&end=2018-03-30',{
          method:'GET',
          // credentials: 'include',
          header:{
            // 'Content-Type':'application/json',
            accessToken:localStorage.accessToken,
          }
        }).then(r=>r.json()).then(d=>{
          console.log(d)
        })
      },
      handlelevel(id,name,cardnum,level){
        console.log(id,name,cardnum,level)
        this.dialogFormVisible = true
        this.leveltable.name=name
        this.leveltable.cardnum=cardnum
        this.leveltable.level=level
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
<style lang="scss">
  .el-date-editor .el-range-separator {
    padding: 0 5px;
    line-height: 50px;
    height: 50px;
  }
  .el-input__inner{
    border-radius: 0;
  }
  .el-input--suffix .el-input__inner {
    border-radius: 0;
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #f56c6c;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #535353 !important;
    background: #535353 !important;
  }
  .el-radio__inner:hover,.el-input__inner:focus{
    border-color: #535353 !important;
  }
  .el-radio__input.is-checked+.el-radio__label {
    color: #535353;
  }
  .confirmButtonClass{
    background-color: red !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FAFAFA !important;
    color: #DADADA !important;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: #fff !important;
    color: #BCBCBC !important;
    min-width: 30px;
    border-radius: 0 !important;
    border: 1px solid #EEEEEE;
    font-weight: normal;
  }
  .el-message-box__btns button:nth-child(2) {
    margin-left: 10px;
    background: #535353 !important;
    border: none;
  }
  .el-message-box__title span{
    font-size: 16px;
  }
  .el-message-box__btns {
    padding: 5px 125px 0!important;
    justify-content: space-between;
    display: flex;
  }
  .el-message-box__btns button{
    border-radius: 0;
  }
  .el-message-box__headerbtn .el-message-box__close {
    color: #000;
    font-size: 24px;
  }
  .el-message-box__headerbtn {
    top: 10px !important;
  }
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
      span{
        justify-content: space-between;
        /*margin-right: 20px;width:200px;*/
      }
      button{
        height: 40px;
        span{
          margin-right: 0;
        }
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
    section{
      main{
        span:nth-of-type(1){
          height: auto;
        }
        span{
          width:100%;
          display: block;
          font-size: 14px;
          color:#C3C3C3;
          margin-top: 10px;
          height: 50px;
          line-height: 50px;
          input{
            width: 75%;
            background:#FAFAFA;
            border: none;
            margin-left: 10px;
            outline: none;
            font-size: 16px;
            padding-left: 15px;
          }
          select{
            width: 75%;
            margin-left: 10px;
            height: 50px;
            outline: none;
            font-size: 16px;
            option{
              font-size: 16px;
            }
          }
        }
        section{
          display: flex;
          justify-content: space-between;
          width: 90%;
          margin: 0 auto;
          margin-top: 20px;
           span{
             width: 47%;
             height: 50px;
             text-align: center;
           }
          span:nth-of-type(1){
            border: 1px solid #535353;
          }
          span:last-of-type{
            background: #535353;
          }
        }
      }
    }
  }
  .buildnew{
    width: 100%;
    padding-right: 90px;
  }
  .recordView{
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
      padding-left:30px ;
    & > span{
      display: block;padding-left:20px;width: 40%;height: 40px;background: #FFF9F9;color:#AEADAD;font-size: 14px;line-height: 40px;font-family: 'xh';margin-bottom: 20px;
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
  }
  .leadingin{
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
  }
</style>
