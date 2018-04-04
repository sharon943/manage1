<template>
    <div class="pay"  v-else-if="leadigIn">
      <header> <span> <img @click="leadigIn=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 批量导入会员卡 </span></header>
      <main v-if="activeI==0" style="position: relative">
        <nav>
          <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;">消费结账</p>
          <p @click="activeI=1">消费记账</p>
          <hr>
        </nav>
        <section>
          <p>* 消费结账功能里的金额、积分、优惠券会真实消费掉,请谨慎使用！</p>
          <p>* 消费结账功能主要是处理由于各种原因没有正常扣除对应的金额、积分、优惠券的异常消费订单。</p>
        </section>
        <el-form ref="form" :model="sizeForm" label-width="80px" style="margin-top: 20px;margin-left: 20px;width: 80%;">
            <el-form-item label="卡号" required>
              <el-input v-model="sizeForm.name" placeholder="请输入会员卡号"></el-input>
            </el-form-item>
            <el-form-item label="金额" >
              <el-input v-model="sizeForm.discount" placeholder="请输入消费金额"></el-input>
              <span style="position: absolute;right:5px;top: 0;color: #818181;">元</span>
            </el-form-item>
            <el-form-item label="积分">
              <el-input v-model="sizeForm.discount" placeholder="请输入消费积分"></el-input>
            </el-form-item>
            <el-form-item label="优惠券">
              <el-input v-model="sizeForm.discount"></el-input>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input v-model="sizeForm.discount" placeholder="请输入会员卡密码"></el-input>
              <span style="position: absolute;right:5px;top: 0;color: #818181;">元</span>
            </el-form-item>
            <el-form-item size="large" >
              <el-button @click="onSubmit" style="margin-left: 0">确认结账</el-button>
            </el-form-item>
        </el-form>
      </main>
      <main v-else>
        <nav>
          <p @click="activeI=0" style="border-left: none">消费结账</p>
          <p style="border-bottom: none;border-top:1px solid #EEEEEE;background: #fff;color:#636363;border-right: 1px solid #EEEEEE">消费记账</p>
          <hr>
        </nav>
        <section>
          <p>* 消费记账功能里的金额不会真实消费掉,但优惠券会真实消费掉,请谨慎使用！</p>
          <p>* 消费记账功能主要是用于补录消费订单信息,并补发该会员因消费产生的积分、经验值和优惠券。</p>
        </section>
        <el-form ref="form" :model="sizeForm" label-width="80px" style="margin-top: 20px;margin-left: 20px;width: 80%;">
          <el-form-item label="卡号" required>
            <el-input v-model="sizeForm.name" placeholder="请输入会员卡号"></el-input>
          </el-form-item>
          <el-form-item label="金额" >
            <el-input v-model="sizeForm.discount" placeholder="请输入消费金额"></el-input>
          </el-form-item>
          <el-form-item label="优惠券">
            <el-input v-model="sizeForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" required>
            <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择门店">
            <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
        width:100%;background:#FFF9F9;padding-left:15px;overflow: hidden;margin-top: 20px;
        p{
          font-size: 14px;color:#B2B1B1;margin-top: 10px;
        }
      }
    }
  }
</style>
