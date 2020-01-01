<!--  -->
<template>
  <div>
    <div class="tableHeader">
      <span>
        <strong>{{ title ? title : "该公司暂无职位信息" }}的在找职位</strong>
      </span>
      <el-button type="success" size="mini" @click="addJob">+新增</el-button>
    </div>
    <el-card>
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
              @click="changeStatus(scope.row)"
              type="primary"
              size="mini"
              >{{ scope.row.status == 0 ? "上架" : "下架" }}</el-button
            >
            <el-button type="success" size="mini" @click="matchJob(scope.row)"
              >匹配</el-button
            >
            <el-button type="success" size="mini" @click="editJob(scope.row)"
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
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyName: "",
      total: 0,
      pageSize: 10,
      currentPage: 1,
      title: "",
      id: "",
      tableData: [
        {
          companyName: "",
          name: "",
          category: "",
          compensation: "",
          experience: "",
          createAt: "",
          status: ""
        }
      ],
      loading: true
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.id = this.$route.query.id;
    this.companyName = this.$route.query.companyName;
    // console.log(this.id)
    this.getJobData();
  },
  methods: {
    getJobData() {
      this.$api.getJob({ companyId: this.id }).then(res => {
        if (res.code === 0) {
          this.loading = false;
          if (res.total !== 0) {
            // console.log(res);
            this.tableData = res.data;
            this.title = res.data[0].companyName;
            this.total = res.total;
          } else {
            this.tableData = res.data;
            this.$message.info("暂无职位信息");
          }
        }
      });
    },
    addJob() {
      this.$router.push({
        path: "/addJob",
        query: {
          id: this.id,
          companyName: this.companyName,
          lastPage: 2
        }
      });
    },
    handleSizeChange(e) {
      // console.log(222);
      let params = {
        companyId: this.id,
        page: 1,
        size: e
      };
      this.loading = true;
      this.$api.getJob(params).then(res => {
        if (res.code === 0) {
          this.loading = false;
          if (res.total !== 0) {
            // console.log(res);
            this.tableData = res.data;
            this.title = res.data[0].companyName;
            this.total = res.total;
          } else {
            this.tableData = res.data;
            this.$message.info("暂无职位信息");
          }
        }
      });
    },
    handleCurrentChange(e) {
      let params = {
        companyId: this.id,
        page: e,
        size: 10
      };
      this.loading = true;
      this.$api.getJob(params).then(res => {
        if (res.code === 0) {
          this.loading = false;
          if (res.total !== 0) {
            // console.log(res);
            this.tableData = res.data;
            this.title = res.data[0].companyName;
            this.total = res.total;
          } else {
            this.tableData = res.data;
            this.$message.info("暂无职位信息");
          }
        }
      });
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
        this.$api.changeStatus(params).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.getJobData();
            this.loading = false;
            setTimeout(() => {
              this.$message.success("修改成功");
            }, 2000);
          }
          if (res.code === -6511) {
            this.loading = false;
            this.$message.error("冻结状态禁止修改上下架");
          }
        });
      }
    },
    matchJob(e) {
      console.log(e);
    },
    editJob(e) {
      // console.log(e.id);
      this.$router.push({
        path: "/addJob",
        query: {
          id: this.id,
          companyId: e.id,
          page: "编辑",
          lastPage: 2
        }
      });
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
        this.$api.deleteJobs(e.id).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.getJobData();
            this.loading = false;
            setTimeout(() => {
              this.$message.success("删除成功");
            }, 2000);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
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
