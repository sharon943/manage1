<template>
  <div class="pay"  v-else-if="leadigIn">
    <header> <span> <img @click="leadigIn=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 合并转移 </span></header>
    <main v-if="activeI==0" style="position: relative">
      <nav>
        <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;">会员卡合并</p>
        <p @click="activeI=1">积分转移</p>
        <hr>
      </nav>
      <section>
        * 会员卡合并主要是将两张不同的会员卡里余额、积分、优惠券合并到其中之一张中。
      </section>
        <ul style="position: relative">
          <li>
            <span>转出卡号 <p style="display: inline-block;color:#FF6C6C">*</p></span>
            <input type="text" placeholder="请输入转出卡号" style="display: block">
            <div style="">
              <h1 style="font-size: 18px;">陈丽  / 15225611198 </h1>
              <foot>
                <span style="border-right: 1px solid #EEEEEE">36.20<p>余额</p></span>
                <span style="border-right: 1px solid #EEEEEE">3620<p>积分</p></span>
                <span>1张<p>优惠券</p></span>
              </foot>
            </div>
          </li>
          <i class="el-icon-d-arrow-right" style="position: absolute;top:65px;left:0;right:0;margin-left: auto;margin-right: auto;width: 20px;font-size: 18px;"></i>
          <li>
          <span>转入卡号 <p style="display: inline-block;color:#FF6C6C">*</p></span>
          <input type="text" placeholder="请输入转入卡号" style="display: block">
          <div style="">
            <h1 style="font-size: 18px;">陈丽  / 15225611198 </h1>
            <foot>
              <span style="border-right: 1px solid #EEEEEE">36.20<p>余额</p></span>
              <span style="border-right: 1px solid #EEEEEE">3620<p>积分</p></span>
              <span>1张<p>优惠券</p></span>
            </foot>
          </div>
        </li>

        </ul>
        <el-button @click="onSubmit" style="margin-left: 0;margin-top: 20px;">确认合并</el-button>
    </main>
    <main v-else>
      <nav>
        <p @click="activeI=0" style="border-left: none">会员卡合并</p>
        <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;border-right: 1px solid #EEEEEE">积分转移</p>
        <hr>
      </nav>
      <section>* 积分转账只能转出指定积分数
      </section>
      <el-form ref="form" :model="sizeForm" label-width="80px" style="margin-top: 20px;margin-left: 20px;width: 80%;">
        <el-form-item label="转出卡号" required>
          <el-input v-model="sizeForm.name" placeholder="请输入转出卡号"></el-input>
        </el-form-item>
        <el-form-item label="转入卡号" required>
          <el-input v-model="sizeForm.discount" placeholder="请输入转入卡号"></el-input>
        </el-form-item>
        <el-form-item label="转账积分" required>
          <el-input v-model="sizeForm.discount" placeholder="请输入需要转账的积分数"></el-input>
        </el-form-item>
        <el-form-item size="large" >
          <el-button @click="onSubmit" style="margin-left: 0">确认结账</el-button>
        </el-form-item>
      </el-form>

    </main>
  </div>
</template>
<script>
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
      section{
        width:100%;background:#FFF9F9;padding-left:15px;overflow: hidden;margin-top: 20px;font-size: 14px;color:#B2B1B1;height:50px;line-height: 50px;
      }
      ul{
        margin-top: 20px;width: 80%;display: flex;justify-content: space-between;
        li{
          width: 45%;margin-top: 20px;
          span{
            font-size: 16px;color:#A7A7A7;
          }
          input{
            margin-top: 10px;width: 100%;
            height: 40px;line-height: 40px;padding-left: 15px;border:1px solid #EEEEEE;
          }
          div{
            width:100%;height: 250px;margin-top: 15px;
            background: #FAFAFA;border-radius: 10px;border:1px solid #EEEEEE;position: relative;
            h1{
              position: absolute;left:15px;top:50px;color: #535353;font-weight: bold;font-size: 16px;
            }
            foot{
              display: flex;justify-content: space-between;position: absolute;bottom: 10px;left:0;width:100%;
              span{
                width: 33%;text-align: center;font-size: 18px;font-weight: bold;color: #000;
                p{
                  font-weight: normal;color:#CCCCCC;margin-top: 5px;font-size: 14px;
                }
              }
            }
          }
        }
      }

    }
  }
</style>
