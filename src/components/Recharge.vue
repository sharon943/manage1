<template>
  <div class="Recharge">
    <header> <span> <img src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 会员充值 </span></header>
    <el-form ref="form" :model="sizeForm" label-width="80px" style="margin-top: 20px;margin-left: 20px;width: 80%;">
      <el-form-item label="充值类型">
        <el-radio-group v-model="sizeForm.resource" size="medium">
          <el-radio border label="会员充值"></el-radio>
          <el-radio border label="套餐充值"></el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="sizeForm.resource=='会员充值'" @click="sizeForm.resource='会员充值'">
      <el-form-item label="卡号" required>
        <el-input v-model="sizeForm.name" placeholder="请输入会员卡号"></el-input>
      </el-form-item>
      <el-form-item label="充值金额" >
        <el-input v-model="sizeForm.discount" placeholder="请输入充值金额,如100"></el-input>
        <span style="position: absolute;right:5px;top: 0;color: #818181;">元</span>
      </el-form-item>
      <el-form-item label="充值积分">
        <el-input v-model="sizeForm.discount" placeholder="请输入充值积分"></el-input>
      </el-form-item>
      <el-form-item label="充值经验值">
        <el-input v-model="sizeForm.discount" placeholder="请输入充值经验值"></el-input>
      </el-form-item>
      <el-form-item label="赠送金额">
        <el-input v-model="sizeForm.discount" placeholder="请输入赠送金额,如100"></el-input>
        <span style="position: absolute;right:5px;top: 0;color: #818181;">元</span>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="onSubmit">确认充值</el-button>
      </el-form-item>
      </div>
      <div v-else @click="sizeForm.resource='套餐充值'">
        <el-form-item label="卡号" required>
          <el-input v-model="sizeForm.name" placeholder="请输入会员卡号"></el-input>
        </el-form-item>
        <el-form-item label="充值套餐">
          <ul v-if="bonusView">
            <span style="width: 80%;height: 20px;text-align: center;margin:0 auto;display: block;font-size: 16px;margin-top: 250px;">
              <i class="el-icon-warning" style="font-size: 30px;margin-right: 5px;"></i>
              您还没有设置充值套餐,请先点击这里 <p style="cursor:pointer;color:#FE6A6A;display: inline-block;font-size: 16px;text-decoration: underline">设置充值套餐</p>
            </span>
          </ul>
          <ul v-else>
              <li v-for="item in bonusData" :key="item.id" @click="handleItemClick(item)">
                <div class="selected" v-if="item.isSelected">√</div>
                <span>充值<h1 style="font-size: 26px;">100</h1></span>
                <span><h1 style="font-size: 16px;height: 20px;margin-bottom: 10px;">充值100元赠送10元</h1> <p>赠送积分  100</p> <p> 赠送金额 10</p><p>赠送经验值 10</p><p>赠送优惠券  五元全场通用现金券</p></span>
              </li>
          </ul>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bonusView:false,
        sizeForm: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '会员充值',
          desc: '',
          discount:'',
        },
        bonusData:[
          {id:1,name:'diyi'},
          {id:2,name:'dier'}
        ]
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleItemClick (item) {
        console.log(this.bonusData);
        console.log(item)
        this.bonusData.map((data) => {
          this.$set(data, 'isSelected', item.id === data.id);
        });
      }
    }
  };
</script>
<style lang="scss">
.el-button {
cursor: pointer;
background: #535353;
border: none;
color: #F6F6F6;
border-radius: 0;
}
  .el-input__inner:focus,.el-input__inner:hover{
    border:1px solid #eeeeee !important;
  }
  .el-radio.is-bordered.is-checked {
    border-color: #535353;
  }
  .el-form-item__label {
    color: #c3c3c3;
  }
  .el-form-item__label {
    font-size: 13px;
  }
  .Recharge{
    width: 100%;
    height: 100%;
    header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      line-height: 45px;
      padding-left: 30px;
      span{
      display: flex;
      font-size: 20px;
      font-family: 'zy';
      }
    }
    ul{
      overflow:scroll;width: 100%;height: 500px;background:#FAFAFA;border:1px solid #eeeeee;padding:0 15px 15px;display: flex;flex-wrap: wrap;justify-content: space-between;
      li{
        width: 48%;
        display: flex;justify-content: space-between;border:1px solid #F1F1F1;background: #fff;margin-top: 10px;
        height: 130px;
        span{
          color:#D5D5D5;font-size: 16px;
          h1{
            color:#000;
          }
          p{
            font-size: 13px;height:16px;margin-bottom: 5px;
          }
        }
        span:nth-of-type(1){
          width:30%;border-right: 1px dashed #F0F0F0;text-align: center;
        }
        span:last-of-type{
          text-align: left;width:70%;padding-left: 20px;
        }
      }
    }
  }
</style>
