<!--  -->
<template>
  <div>
    <div>{{ page }}</div>
    <el-card>
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="角色名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="addArtBtn">
        <el-button type="primary" @click="confirm">保存</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: this.$route.query.page,
      form: {
        name: ""
      },
      formRules: { name: [{ required: true, message: "请填写角色名" }] }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    confirm() {},
    cancel() {}
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
