<!--  -->
<template>
  <div>
    <div class="tableContent">
      <div class="tableHeader">
        <span>角色列表</span>
        <el-button @click="addRole" type="primary" size="mini"
          >新增角色</el-button
        >
      </div>
    </div>
    <el-card>
      <el-table
        :data="tableData"
        stripe
        style="width:100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editRole(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="deleteRole(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
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
      loading: true,
      page: 1,
      total: 0,
      size: 10,
      ids: "",
      tableData: [{ name: "", id: "" }]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getId();
    setTimeout(() => {
      this.getRole();
    }, 1500);
  },
  methods: {
    getId() {
      let params = {
        page: this.page,
        size: this.size
      };
      this.$api.addRoleGetId(params).then(res => {
        console.log(res);
        this.ids = res.data.ids;
        this.total = res.data.total;
      });
    },
    getRole() {
      this.$api.addRoleGetRole({ ids: this.ids }).then(res => {
        console.log(res);
        this.tableData = res.data.roleList;
        this.loading = false;
      });
    },
    addRole() {
      this.$router.push({
        path: "/addRole",
        query: {
          page: "新增"
        }
      });
    },
    editRole(e) {
      console.log(e);
      this.$router.push({
        path: "/addRole",
        query: {
          page: "编辑",
          id: e.id
        }
      });
    },
    async deleteRole(e) {
      console.log(e.id);
      const confirmDelete = await this.$confirm("确认要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      if (confirmDelete !== "confirm") {
        return this.$message.info("取消操作");
      } else {
        this.$api.deleteRole(e.id).then(res => {
          if (res.code === 0) {
            this.getId();
            setTimeout(() => {
              this.getRole();
              this.$message.success("删除成功");
            }, 1500);
          }
        });
      }
    },
    handleSizeChange(e) {
      this.loading = true;
      this.size = e;
      this.getId();
      setTimeout(() => {
        this.getRole();
      }, 1500);
    },
    handleCurrentChange(e) {
      this.loading = true;
      this.page = e;
      this.getId();
      setTimeout(() => {
        this.getRole();
      }, 1500);
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      color: #606266;
      font-weight: 700;
    }
  }
}
</style>
