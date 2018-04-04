<template>
  <div class="region">
    <header> <span> <img @click="buildnew=false" src="../assets/img/youjian.png" alt="" style="width: 20px;height: 15px;margin-top: 15px;margin-right: 10px;"> 区域分组 </span></header>
    <div style="width:100%;display: flex;height: 100%;">
      <el-collapse accordion style="width:29%;height: 100%;background:#FAFAFA;border:1px solid #EEEEEE;">
        <el-collapse-item style="background:#FAFAFA;">
          <template slot="title" style="padding:0 20px;background:#FAFAFA;">
            一致性 Consistency<i class="header-icon el-icon-info"></i>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
      <el-transfer v-model="value1" :data="data" style="width:70%;height: 100%;"></el-transfer>

    </div>
  </div>
</template>
<script>
  export default{
    data(){
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value1: [1, 4]
      };
    }
  }
</script>
<style scoped lang="scss">
  .region{
    width: 100%;
    height: 100%;
    header{
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      line-height: 45px;
      margin-bottom: 20px;
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
    div{
      height: 100%;
      .el-transfer{
        height: 100%;
        .el-transfer-panel{
          height: 100%;
        }
      }
    }
  }
</style>
