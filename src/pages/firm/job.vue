<!--  -->
<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :lg="8" :md="12">
            <el-form-item label="公司名称">
              <el-input v-model="form.companyName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="职位名称">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="工作经验">
              <el-select v-model="form.experience">
                <el-option
                  v-for="item in workExperience"
                  :label="item.label"
                  :key="item.experience"
                  :value="item.experience"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="form.startAt"
                :picker-options="createAtOptions"
                @change="createAtChange"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="更新时间">
              <el-date-picker
                v-model="form.endAt"
                :picker-options="updateAtOptions"
                @change="updataAtChange"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="学历要求">
              <el-select v-model="form.education" clearable>
                <el-option
                  v-for="item in educationOption"
                  :key="item.education"
                  :value="item.education"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="职业类别">
              <el-select v-model="form.category" clearable>
                <el-option
                  v-for="item in categoryOption"
                  :key="item.category"
                  :label="item.label"
                  :value="item.category"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" clearable>
                <el-option
                  v-for="item in statusOption"
                  :value="item.status"
                  :key="item.status"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="薪资">
              <el-select v-model="form.compensation" clearable>
                <el-option
                  v-for="item in compensationOption"
                  :key="item.compensation"
                  :label="item.label"
                  :value="item.compensation"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="formBtn">
          <el-button type="danger" size="small" @click="resetSearch"
            >清空</el-button
          >
          <el-button type="success" size="small" @click="comfirmSearch"
            >搜索</el-button
          >
        </div>
      </el-form>
    </el-card>

    <div class="tableContent">
      <div class="tableHeader">
        <div>
          <span>职位列表</span>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="companyName" label="在招公司"></el-table-column>
        <el-table-column prop="name" label="职位名称"></el-table-column>
        <el-table-column prop="category" label="职业类别">
          <template slot-scope="scope">
            {{ scope.row.category | jobType }}
          </template>
        </el-table-column>
        <el-table-column prop="compensation" label="薪资">
          <template slot-scope="scope">{{
            scope.row.compensation | compensationType
          }}</template>
        </el-table-column>
        <el-table-column prop="education" label="学历要求">
          <template slot-scope="scope">
            {{ scope.row.education | educationType }}
          </template>
        </el-table-column>
        <el-table-column prop="experience" label="工作经验">
          <template slot-scope="scope">{{
            scope.row.experience | experienceType
          }}</template>
        </el-table-column>
        <el-table-column prop="createAt" label="发布时间">
          <template slot-scope="scope">{{
            scope.row.createAt | DateType
          }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{
            scope.row.status | statusType
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              @click="changeStatus(scope.row)"
              >{{ scope.row.status == 1 ? "下架" : "上架" }}</el-button
            >
            <el-button type="success" size="mini" @click="matchJob(scope.row)"
              >匹配</el-button
            >
            <el-button type="primary" size="mini" @click="editJob(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="deleteJob(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import { type } from 'os';
export default {
  data() {
    return {
      // 时间选择框的禁用
      createAtOptions: {},
      updateAtOptions: {},
      // 初始化表单数据
      form: {
        companyName: "",
        name: "",
        experience: "",
        education: "",
        status: "",
        compensation: "",
        startAt: "",
        endAt: "",
        category: "",
        page: 1,
        size: 10
      },
      total: 0,
      id: "",
      // 初始化表格数据
      tableData: [
        {
          companyName: "",
          name: "",
          category: "",
          compensation: "",
          experience: "",
          createAt: "",
          status: "",
          education: ""
        }
      ],
      loading: true,
      workExperience: this.$store.state.workExperience,
      educationOption: this.$store.state.educationOption,
      categoryOption: this.$store.state.categoryOption,
      statusOption: this.$store.state.statusOption,
      compensationOption: this.$store.state.compensationOption
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    if (sessionStorage.getItem("job")) {
      this.form = JSON.parse(sessionStorage.getItem("job"));
    }
    this.id = this.$route.query.id;
    this.comfirmSearch();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  watch: {
    form: {
      handler: function(value) {
        sessionStorage.setItem("job", JSON.stringify(value));
      },
      deep: true
    }
  },
  methods: {
    // getJobData() {
    //   this.$api.getJob().then(res => {
    //     if (res.code === 0) {
    //       console.log(res);
    //       this.tableData = res.data;
    //       this.loading = false;
    //       // this.title = res.data[0].companyName;
    //       this.total = res.total;
    //     } else {
    //       this.loading = false;
    //       this.$message.warning("服务器故障");
    //     }
    //   });
    // },
    // 职位列表页条件搜索功能 endAt时间戳为当天23:59所以加一天减一
    comfirmSearch() {
      this.loading = true;
      if (this.form.endAt) this.form.endAt += 85999999;
      this.form.page = 1;
      this.form.size = 10;
      // console.log(this.form);
      this.$api
        .getJob(this.form)
        .then(res => {
          if (res.code === 0) {
            this.loading = false;
            this.tableData = res.data;
            this.total = res.total;
          }
        })
        .catch(err => err);
    },
    // 职位列表页重置表单
    resetSearch() {
      this.loading = true;
      this.form = {
        companyName: "",
        name: "",
        experience: "",
        education: "",
        status: "",
        compensation: "",
        startAt: "",
        endAt: "",
        category: "",
        page: 1,
        size: 10
      };
      this.$api
        .getJob(this.form)
        .then(res => {
          if (res.code === 0) {
            this.loading = false;
            this.tableData = res.data;
            this.total = res.total;
          }
        })
        .catch(err => err);
    },
    // 页面条数回调
    handleSizeChange(e) {
      // console.log(e);
      this.loading = true;
      this.form.size = e;
      this.form.page = 1;
      this.$api
        .getJob(this.form)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
            this.loading = false;
            this.total = res.total;
          } else {
            this.loading = false;
            this.$message.warning("服务器故障");
          }
        })
        .catch(err => err);
    },
    // 页码改变回调
    handleCurrentChange(e) {
      // console.log(e);
      this.loading = true;
      this.form.page = e;
      this.$api
        .getJob(this.form)
        .then(res => {
          if (res.code === 0) {
            this.tableData = res.data;
            this.loading = false;
            this.total = res.total;
          }
        })
        .catch(err => err);
    },
    // 发布时间的回调
    createAtChange(e) {
      if (e) {
        this.form.startAt = e.getTime();
        // 禁用的时间段
        this.updateAtOptions = {
          disabledDate(time) {
            return time.getTime() < e.getTime();
          }
        };
      } else {
        this.updateAtOptions = {};
      }
    },
    // 截止时间的回调
    updataAtChange(e) {
      if (e) {
        // console.log(e);
        this.form.endAt = e.getTime();
        // 禁用的时间段
        this.createAtOptions = {
          disabledDate(time) {
            return time.getTime() > e.getTime();
          }
        };
      } else {
        this.createAtOptions = {};
      }
    },

    async changeStatus(e) {
      // console.log(e);

      const confirmStatus = await this.$confirm(
        "更改上下架状态是否继续",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmStatus !== "confirm") {
        this.loading = false;
        return this.$message.info("已取消本次操作");
      } else {
        this.loading = true;
        let params = {
          status: e.status === 1 ? 0 : 1,
          id: e.id
        };
        this.$api
          .changeStatus(params)
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.comfirmSearch();
              this.loading = false;
              setTimeout(() => {
                this.$message.success("修改成功");
              }, 2000);
            }
            if (res.code === -6511) {
              this.loading = false;
              this.$message.error("冻结状态禁止修改上下架");
            }
          })
          .catch(err => err);
      }
    },
    async deleteJob(e) {
      // console.log(e);
      const confirmDelete = await this.$confirm("确认要删除吗", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      }).catch(err => err);
      if (confirmDelete !== "confirm") {
        this.loading = false;
        return this.$message.info("已取消操作");
      } else {
        this.loading = true;
        this.$api
          .deleteJobs(e.id)
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.comfirmSearch();
              this.loading = false;
              setTimeout(() => {
                this.$message.success("删除成功");
              }, 2000);
            }
          })
          .catch(err => err);
      }
    },
    matchJob(e) {
      // console.log(e);
      this.$router.push({
        path: "/intention",
        query: {
          id: e.id,
          companyId: e.companyId
        }
      });
    },
    editJob(e) {
      // console.log(e);
      this.$router.push({
        path: "/addJob",
        query: {
          id: e.companyId,
          companyId: e.id,
          page: "编辑",
          lastPage: 1
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.tableContent {
  margin-top: 20px;
  .tableHeader {
    padding: 10px 15px;
    box-sizing: border-box;
    background-color: #ddd;
    border-radius: 5px;
    span {
      font-size: 14px;
      color: #606266;
      font-weight: 700;
    }
  }
}
.formBtn {
  float: right;
  margin-bottom: 20px;
}
</style>
