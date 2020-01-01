<!--  -->
<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-form-item label="输入旧密码">
          <el-input v-model="form.oldPwd" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="设置新密码">
          <el-input v-model="form.newPwd" placeholder="请设置新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input
            v-model="form.checkPwd"
            placeholder="请再次输入并确认新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button>保存</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        checkPwd: ""
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
