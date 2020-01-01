<!--  -->
<template>
  <el-card class="login_box">
    <!-- 标题 -->
    <div class="loginTitle">萝卜多后台管理</div>
    <el-form
      ref="loginFormRef"
      :rules="loginFormRules"
      :model="loginForm"
      label-width="0px"
      class="login_form"
    >
      <!-- 登录名 -->
      <el-form-item prop="name">
        <el-input v-model="loginForm.name" prefix-icon="el-icon-user" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="pwd">
        <el-input
          v-model="loginForm.pwd"
          prefix-icon="el-icon-lock"
          type="password"
          show-password
        />
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login" class="loginBtn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// import qs from "qs";
export default {
  data() {
    return {
      errorMessage: "",
      // 这是登录表单数据绑定对象
      loginForm: {
        name: "",
        pwd: ""
      },
      // 这是表单验证数据
      loginFormRules: {
        name: [
          // 验证用户名
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        pwd: [
          // 验证密码
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        this.$api.login(this.loginForm).then(res => {
          console.log(res);
          if (res.code === 0) {
            window.sessionStorage.setItem("token", "token");
            sessionStorage.setItem("managerName", res.data.manager.name);
            sessionStorage.setItem("userRole", res.data.role.name);
            // this.$store.userRole = res.data.role.name
            this.$router.push("/welcome");
          } else {
            this.$message(res.message);
          }
        });
        // this.$axios
        //   .post("/api/a/login", qs.stringify(this.loginForm))
        //   .then(res => {
        //     console.log(res.data);
        //     if (res.data.code === 0) {
        //       window.sessionStorage.setItem("token", "token");
        //       // this.$router.push("/welcome");
        //     }
        //   });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login_box {
  padding: 20px;
}
.loginTitle {
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
}
.loginError {
  padding: 0;
}
.loginBtn {
  width: 100%;
  margin: 10px 0;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
.login_form {
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
}
</style>
