<!--  -->
<template>
  <div>
    <div class="tableContent">
      <div class="tableHeader">
        <div>
          <span>模块管理</span>
        </div>
        <el-button type="primary" size="mini" @click="addModule"
          >新增+</el-button
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
        <el-table-column prop="id" label="自增长ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="url" label="模块对应url地址"></el-table-column>
        <el-table-column prop="parentID" label="父模块ID"></el-table-column>
        <el-table-column prop="type" label="模块类型"></el-table-column>
        <el-table-column prop="updateAt" label="数据更新时间">
          <template slot-scope="scope">
            {{ scope.row.updateAt | DateType }}
          </template>
        </el-table-column>
        <el-table-column prop="updateBy" label="更新人ID"></el-table-column>
        <el-table-column prop="createAt" label="数据创建时间">
          <template slot-scope="scope">
            {{ scope.row.createAt | DateType }}
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者ID"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="editModule(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteModule(scope.row)"
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
      size: 10,
      total: 0,
      ids: [],
      tableData: [
        {
          id: "",
          name: "",
          url: "",
          parentID: "",
          type: "",
          updateAt: "",
          updateBy: "",
          createAt: "",
          createBy: ""
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getID();
    setTimeout(() => {
      this.getData();
    }, 1000);
  },
  methods: {
    getID() {
      let params = {
        page: this.page,
        size: this.size
      };
      this.$api
        .ModuleGetID(params)
        .then(res => {
          if (res.code === 0) {
            this.ids = res.data.ids;
            this.total = res.data.total;
            // this.loading = false;
          }
        })
        .catch(err => err);
    },
    getData() {
      this.$api
        .ModuleGetData({ ids: this.ids })
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.tableData = res.data.moduleList;
            this.loading = false;
            // console.log(this.tableData);
          }
        })
        .catch(err => err);
    },
    handleSizeChange(e) {
      this.loading = true;
      this.size = e;
      this.getID();
      setTimeout(() => {
        this.getData();
      }, 1000);
    },
    handleCurrentChange(e) {
      this.loading = true;
      this.page = e;
      this.getID();
      setTimeout(() => {
        this.getData();
      }, 1000);
    },
    editModule(e) {
      console.log(e);
      this.$router.push({
        path: "/addModule",
        query: {
          page: "编辑",
          id: e.id
        }
      });
    },
    addModule() {
      this.$router.push({
        path: "/addModule",
        query: {
          page: "新增"
        }
      });
    },
    async deleteModule(e) {
      const confirmDelete = await this.$confirm("确认要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      if (confirmDelete !== "confirm") {
        return this.$message.info("取消操作");
      } else {
        this.$api
          .deleteModuleApi(e.id)
          .then(res => {
            // console.log(res.message)
            if (res.code === 0) {
              this.$message.success("删除成功");
            } else {
              this.$message.warning(res.message);
            }
          })
          .catch(err => err);
      }
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
