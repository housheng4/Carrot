<!--  -->
<template>
  <div>
    <div class="tableHeader">
      <span>招聘职位意向</span>
    </div>
    <el-card class="header">
      <div class="head-line1">
        <div>
          职位类别: <span>{{ category | jobType }}</span>
        </div>
        <div>
          工作经验: <span>{{ experience | experienceType }}</span>
        </div>
        <div>
          公司名称: <span>{{ companyName }}</span>
        </div>
      </div>
      <div class="head-line2">
        <div>
          期望薪资: <span>{{ compensation | compensationType }}</span>
        </div>
        <div>
          学历: <span>{{ education | educationType }}</span>
        </div>
        <div>
          英语水平: <span>{{ englishLevel | englishLevelType }}</span>
        </div>
      </div>
    </el-card>
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      category: "",
      experience: "",
      companyName: "",
      compensation: "",
      education: "",
      englishLevel: ""
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getData();
    console.log(this.id);
  },
  methods: {
    getData() {
      this.$api.editGetJobs(this.id).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.category = res.data.category;
          this.experience = res.data.experience;
          this.companyName = res.data.companyName;
          this.compensation = res.data.compensation;
          this.education = res.data.education;
          this.englishLevel = res.data.englishLevel;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.head-line1,
.head-line2 {
  display: flex;
  justify-content: space-between;
  div {
    width: 150px;
    font-size: 14px;
    span {
      margin-left: 10px;
    }
  }
}
.tableHeader {
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
