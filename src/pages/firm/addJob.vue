<!--  -->
<template>
  <div>
    <el-form
      :disabled="disabledForm"
      :model="addJobForm"
      ref="addFormJobRef"
      :rules="addJobFormRules"
      label-width="100px"
    >
      <div class="header">
        <div>职位概况</div>
        <el-form-item>
          <el-select size="mini" v-model="addJobForm.recommend">
            <el-option
              v-for="item in jobRecommend"
              :value="item.recommend"
              :key="item.recommend"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-card style="padding-bottom:50px">
        <el-row>
          <el-col :md="8">
            <el-form-item prop="name" label="职位名称">
              <el-input v-model="addJobForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="16" style="display:flex;">
            <el-form-item prop="category" label="职位分类">
              <el-select v-model="addJobForm.category">
                <el-option
                  v-for="item in categoryOption"
                  :key="item.category"
                  :value="item.category"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="subCategory" label-width="0">
              <el-select
                v-model="addJobForm.subCategory"
                style="padding-right:20px"
              >
                <el-option
                  v-for="item in subCategoryOption"
                  :key="item.subCategory"
                  :value="item.subCategory"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="工作性质">
              <el-select v-model="addJobForm.nature">
                <el-option
                  v-for="item in natureOption"
                  :key="item.nature"
                  :value="item.nature"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="7">
            <el-form-item prop="jobNumber" label="职位个数">
              <el-input
                v-model="addJobForm.jobNumber"
                @input="checkNum"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="9">
            <el-form-item label="截止日期">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="addJobForm.endAt"
                @change="endAtChange"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Leader背景">
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                v-model="addJobForm.leaderBackground"
              ></el-input>
            </el-form-item>
          </el-col>
          <div class="tableHeader">
            <div>
              <span>职位要求</span>
            </div>
            <!-- <el-button type="primary" size="mini" @click="addFirm">新增+</el-button> -->
          </div>
          <el-card>
            <el-col :md="8">
              <el-form-item label="工作经验">
                <el-select v-model="addJobForm.experience">
                  <el-option
                    v-for="item in experienceOption"
                    :key="item.experience"
                    :value="item.experience"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="学历要求">
                <el-select v-model="addJobForm.education">
                  <el-option
                    v-for="item in educationOption"
                    :key="item.education"
                    :value="item.education"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="大数据开发经验" label-width="120px">
                <el-select v-model="addJobForm.bigData">
                  <el-option
                    v-for="item in bigDataOption"
                    :key="item.bigData"
                    :value="item.bigData"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item prop="compensation" label="薪资">
                <el-select v-model="addJobForm.compensation">
                  <el-option
                    v-for="item in compensationOption"
                    :key="item.compensation"
                    :value="item.compensation"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="英语水平">
                <el-select v-model="addJobForm.englishLevel">
                  <el-option
                    v-for="item in englishLevelOption"
                    :key="item.englishLevel"
                    :value="item.englishLevel"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="BAT从业经验" label-width="120px">
                <el-select v-model="addJobForm.bat">
                  <el-option
                    v-for="item in batOption"
                    :key="item.bat"
                    :value="item.bat"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-card>
          <div class="tableHeader">
            <div>
              <span>职位描述</span>
            </div>
            <!-- <el-button type="primary" size="mini" @click="addFirm">新增+</el-button> -->
          </div>
          <el-card>
            <el-col>
              <el-form-item prop="responsibility" label="岗位职责">
                <el-input
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  v-model="addJobForm.responsibility"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="requisite" label="任职要求">
                <el-input
                  type="textarea"
                  maxlength="500"
                  show-word-limit
                  v-model="addJobForm.requisite"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-card>
        </el-row>
      </el-card>
    </el-form>
    <el-row style="margin-top:-50px">
      <el-col>
        <el-button
          size="small"
          class="FormBtn"
          type="danger"
          @click="cancelForm"
          >取 消</el-button
        >
        <el-button
          size="small"
          :disabled="disabledBtn"
          class="FormBtn"
          type="success"
          @click="confirmForm"
          >{{ confirmText }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastPage: this.$route.query.lastPage,
      count: 0, // 计数器 点击确定按钮第2下发送请求
      confirmText: "", // 按钮的文字显示是确认还是保存
      disabledForm: false, //表单是否禁用
      disabledBtn: false, // 确认按钮是否禁用
      page: "", //判断编辑还是新增
      id: "", // 判断身份id
      companyId: this.$route.query.companyId, // 判断是那个公司
      categoryOption: this.$store.state.categoryOptionJob, // 职位分类选项
      jobRecommend: this.$store.state.jobRecommend, // 职位的推荐还是普通选项
      subCategoryOption: this.$store.state.subCategoryOption, // 次级选择项
      natureOption: this.$store.state.natureOption, // 工作性质
      experienceOption: this.$store.state.workExperienceJob, // 工作经验
      educationOption: this.$store.state.educationOptionJob, // 学历要求
      bigDataOption: this.$store.state.bigDataOption, // 大数据经验
      compensationOption: this.$store.state.compensationOptionJob, // 薪资
      englishLevelOption: this.$store.state.englishLevelOption, // 英语水平
      batOption: this.$store.state.batOption, // BAT经验
      addJobForm: {
        recommend: 0, // 职位选择框选项 初始为普通
        name: "", // 职位名称
        companyName: this.$route.query.companyName, // 公司名称
        category: "", // 职位分类
        subCategory: "", // 职位次级分类
        nature: "", // 工作性质
        jobNumber: "", // 职位个数
        endAt: "", // 截止日期
        experience: "", // 工作经验
        education: "", // 学历要求
        bigData: "", // 大数据开发经验
        compensation: "", // 薪资
        englishLevel: "", //英语水平
        bat: "", // BAT经验
        responsibility: "", //岗位职责
        requisite: "", //任职要求
        companyId: this.$route.query.companyId, // 判断是那个公司
        id: this.id // 判断是具体哪个职位
      }, // 表单
      addJobFormRules: {
        name: [{ required: true, message: "请输入职位名称" }],
        category: [{ required: true, message: "请输入职业分类" }],
        subCategory: [{ required: true, message: "请输入具体类别" }],
        jobNumber: [{ required: true, message: "请输入职位个数" }],
        compensation: [{ required: true, message: "请输入薪资" }],
        responsibility: [{ required: true, message: "请输入岗位职责" }],
        requisite: [{ required: true, message: "请输入任职要求" }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 86000000 < Date.now();
        }
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.id = this.$route.query.id;
    this.page = this.$route.query.page;
    // this.companyId = this.$route.query.companyId
    console.log(this.id);
    console.log(this.page);
    if (this.page === "编辑") {
      this.confirmText = "编 辑";
      this.disabledForm = true;
      this.getJobData();
    } else {
      this.confirmText = "保 存";
      this.disabledBtn = true;
    }
  },
  watch: {
    addJobForm: {
      handler: function(val) {
        if (
          val.name &&
          val.category &&
          val.subCategory &&
          val.jobNumber &&
          (val.compensation > 0 || val.compensation === 0) &&
          val.responsibility &&
          val.requisite
        ) {
          this.disabledBtn = false;
        } else {
          this.disabledBtn = true;
        }
      },
      deep: true // 深度验证
    }
  },
  methods: {
    // 时间选择框回调
    endAtChange(e) {
      this.addJobForm.endAt = e.getTime();
      // this.addJobForm.endAt += 85999999;
      // console.log(this.addJobForm.endAt);
    },
    cancelForm() {
      console.log(this.lastPage, this.id, "取消");
      console.log("取消");
      if (this.lastPage == 1) {
        this.$router.push("/job");
      }
      if (this.lastPage == 2) {
        this.$router.push({
          path: "/jobDetail",
          query: {
            id: this.id
          }
        });
      }
    },
    // 根据传过来的值判断按钮是编辑还是保存，提交的时候进行验证
    confirmForm(e) {
      this.count++;
      if (this.page === "编辑") {
        console.log(this.addJobForm);
        delete this.addJobForm.companyList;
        // 如果为编辑页面点击编辑后表单变为可编辑状态
        this.disabledForm = false;
        this.confirmText = "保 存";
        // 编辑
        if (this.count >= 2) {
          this.$refs.addFormJobRef.validate(valid => {
            if (valid) {
              console.log(this.addJobForm);
              this.$api
                .editJobs({ profession: this.addJobForm }, this.companyId)
                .then(res => {
                  console.log(res);
                  if (res.code === 0) {
                    console.log("成功111", this.id);
                    if (this.lastPage === 2) {
                      this.$router.push({
                        path: "/jobDetail",
                        query: {
                          id: this.id
                        }
                      });
                    } else {
                      this.$router.push("/job");
                    }
                  } else {
                    this.$message.warning("请求失败");
                  }
                });
            } else {
              this.$message.warning("请完善表单");
            }
          });
        }
      } else {
        // 新增
        console.log(this.companyId);
        this.$api.addJobs({ profession: this.addJobForm }).then(res => {
          console.log(res);
          if (res.code === 0) {
            console.log("成功", this.id);
            this.$router.push({
              path: "/jobDetail",
              query: {
                id: this.id
              }
            });
          } else {
            this.$message.warning("请求失败");
          }
        });
      }
      console.log("确 定", e);
      // this.$router.push("/job")
    },
    // 编辑页面获取表单数据
    getJobData() {
      console.log(this.companyId);
      this.$api.editGetJobs(this.companyId).then(res => {
        if (res.code === 0) {
          console.log(res);
          this.addJobForm = res.data;
        }
      });
    },
    // @input触发的事件，限制input输入框的内容
    checkNum(e) {
      // 下面这种在页面上添加的办法没有做到实时监控，没有触发表单验证
      // onkeyup="this.value=this.value.replace(/\D/g,'');this.value=this.value<=20&&this.value>0?this.value:''"
      // 粘贴时触发的事件 onafterpaste="this.value=this.value.replace(/\D/g,'');this.value=this.value<=20&&this.value>0?this.value:''"
      console.log(e);
      this.addJobForm.jobNumber = this.dealInputNum(this.addJobForm.jobNumber);
    },
    // 限制input输入框的内容的方法
    dealInputNum(value) {
      value = value.replace(/\D/g, "");
      if (value > 0 && value <= 20) return value;
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.FormBtn {
  float: right;
  margin-right: 20px;
}
.header {
  background-color: #ddd;
  border-radius: 5px;
  padding: 2px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form-item {
    margin: 0;
  }
  .el-select {
    width: 100px;
  }
}
.tableHeader {
  margin-top: 20px;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
  }
}
</style>
