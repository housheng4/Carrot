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
        <el-form-item prop="title" label="标题名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="类型">
          <el-select v-model="form.type" clearable>
            <el-option
              v-for="item in addArticleType"
              :key="item.type"
              :value="item.type"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="industry" v-if="form.type === 3">
          <el-select v-model="form.industry">
            <el-option
              v-for="item in addArticleIndustry"
              :key="item.industry"
              :value="item.industry"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="跳转链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="配图">
          <el-upload
            action="/api/a/u/img/housheng"
            list-type="picture"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="loadSuccess"
            :limit="1"
            :file-list="fileList"
            v-model="form.img"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div class="addArtBtn">
        <div>
          <el-button type="success" :disabled="disabledBtn" @click="confirmA"
            >立即上线</el-button
          >
          <el-button type="primary" :disabled="disabledBtn" @click="confirmB"
            >存为草稿</el-button
          >
        </div>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabledBtn: true,
      page: this.$route.query.page,
      id: this.$route.query.id,
      addArticleType: this.$store.state.addArticleType,
      addArticleIndustry: this.$store.state.addArticleIndustry,
      fileList: [],
      dialogImageUrl: "", // 缩略图文件url
      dialogVisible: false, // 默认不展示缩略图
      form: {
        title: "",
        type: "",
        industry: "",
        content: "",
        url: "",
        img: ""
      },
      formRules: {
        title: [{ required: true, message: "请输入标题名称" }],
        type: [{ required: true, message: "请选择类型" }],
        industry: [{ required: true, message: "请选择类型" }],
        url: [{ required: true, message: "请输入url" }],
        img: [{ required: true, message: "请上传图片" }]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  watch: {
    form: {
      handler: function(value) {
        if (
          value.title &&
          value.type !== 3 &&
          (value.type === 0 || value.type > 0) &&
          value.url &&
          value.img
        ) {
          this.disabledBtn = false;
        } else if (
          value.type === 3 &&
          (value.industry === 0 || value.industry) &&
          value.title &&
          value.url &&
          value.img
        ) {
          this.disabledBtn = false;
        } else {
          this.disabledBtn = true;
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.page == "编辑") {
      this.getData();
    }
  },
  methods: {
    // 控制显示缩略图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移除的回调
    handleRemove() {
      this.form.img = "";
    },
    // 图片上传成功
    loadSuccess(e) {
      this.form.img = e.data.url;
      this.$message.success("上传成功");
    },
    // 进入页面搜索数据
    getData() {
      this.$api
        .addArticleGet(this.id)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.form = res.data.article;
            this.fileList = [{ url: res.data.article.img }];
          }
        })
        .catch(err => err);
    },
    // 取消回到上一页
    cancel() {
      this.$router.push("/article");
    },
    // 立即上线
    confirmA() {
      this.form.status = 2;
      if (this.page === "编辑") {
        this.putMethod();
      }
      this.postMethod();
    },
    // 存为草稿
    confirmB() {
      this.form.status = 1;
      if (this.page === "编辑") {
        this.putMethod();
      }
      if (this.page === "新增") {
        this.postMethod();
      }
    },
    // 发送post请求
    postMethod() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$api
            .addArticlePost(this.form)
            .then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$router.push("/article");
              } else {
                this.$message.warning("服务器错误");
              }
            })
            .catch(err => err);
        } else {
          this.$message.info("请完善表单");
        }
      });
    },
    // 发送put请求
    putMethod() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$api
            .addArticlePut(this.form, this.id)
            .then(res => {
              console.log(res);
              if (res.code === 0) {
                this.$router.push("/article");
              } else {
                this.$message.warning("服务器错误");
              }
            })
            .catch(err => err);
        } else {
          this.$message.info("请完善表单");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.addArtBtn {
  display: flex;
  justify-content: space-between;
}
</style>
