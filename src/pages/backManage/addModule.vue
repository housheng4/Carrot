<!--  -->
<template>
  <div>
    <el-card>
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="menuID" label="MenuId">
          <el-input v-model="form.menuID"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="URL地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="parentID" label="父模块ID">
          <el-input @input="checkNum" v-model="form.parentID"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="模块类别">
          <el-input v-model="form.type"></el-input>
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
      id: this.$route.query.id,
      form: {
        name: "",
        menuID: "",
        url: "",
        parentID: "",
        type: ""
      },
      formRules: {
        name: [{ required: true, message: "请输入名称" }]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    if (this.page === "编辑") {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$api
        .addModuleGet(this.id)
        .then(res => {
          this.form = res.data.module;
        })
        .catch(err => err);
    },
    confirm() {
      if (this.page === "新增") {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            this.$api
              .addModule(this.form)
              .then(res => {
                if (res.code === 0) {
                  this.$router.push("/module");
                }
              })
              .catch(err => err);
          }
        });
      }
      if (this.page === "编辑") {
        this.$refs.formRef.validate(valid => {
          if (valid) {
            this.$api
              .addModulePut(this.form, this.id)
              .then(res => {
                if (res.code === 0) {
                  this.$router.push("/module");
                }
              })
              .catch(err => err);
          }
        });
      }
    },
    cancel() {
      this.$router.push("/module");
    },
    checkNum() {
      this.form.parentID = this.form.parentID.replace(/\D/g, "");
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
