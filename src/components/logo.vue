<template>
  <el-col :span="5">
    <div><span>万才网</span></div>
    <div><span>项目管理控制台</span></div>
  </el-col>
</template>
<script>
  export default {
  };
</script>
<style lang="scss" scoped>
.el-col {
  padding-left: 2px;
  // background: #EEF1F6;
  // background: #EEF1A7;
  height: 60px;
  > div:first-child {
      // padding-top: 2px;
      height: 40px;
      // width: 100%;
      line-height: 40px;
      > span {
        font-size: 26px;
        margin-bottom: 0;
      }
  }
  > div:last-child {
    // width: 100%;
    line-height: 20px;
    height: 20px;
  }
}
</style>
