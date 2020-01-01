<!--  -->
<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-row>
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
            <el-form-item label="类型">
              <el-select v-model="form.type">
                <el-option
                  v-for="item in ArticleType"
                  :key="item.type"
                  :value="item.type"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="12">
            <el-form-item label="状态">
              <el-select v-model="form.status">
                <el-option
                  v-for="item in ArticleStatus"
                  :key="item.status"
                  :value="item.status"
                  :label="item.label"
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
          <span>Article列表</span>
        </div>
        <el-button type="primary" size="mini" @click="addArticle"
          >新增+</el-button
        >
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
        row-key="id"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            {{ scope.row.type | ArticleType }}
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="发布时间">
          <template slot-scope="scope">
            {{ scope.row.createAt | DateType }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="修改时间">
          <template slot-scope="scope">
            {{ scope.row.updateAt | DateType }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "草稿" : "上线" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button
              slot="reference"
              type="success"
              size="mini"
              @click="changeStatus(scope.row)"
              >{{ scope.row.status === 1 ? "上线" : "下线" }}</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="editArticle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteArticle(scope.row)"
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
import Sortable from "sortablejs";

export default {
  data() {
    return {
      loading: true,
      // 时间选择框的禁用
      createAtOptions: {},
      updateAtOptions: {},
      // 表单
      form: {
        type: "",
        status: "",
        startAt: "",
        endAt: "",
        page: 1,
        size: 10
      },
      tableData: [
        {
          title: "",
          type: "",
          createAt: "",
          updateAt: "",
          status: ""
        }
      ],
      total: 0,
      ArticleType: this.$store.state.ArticleType,
      ArticleStatus: this.$store.state.ArticleStatus
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    if (sessionStorage.getItem("article")) {
      this.form = JSON.parse(sessionStorage.getItem("article"));
    }
    this.comfirmSearch();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.rowDrop();
  },
  watch: {
    form: {
      handler: function(value) {
        sessionStorage.setItem("article", JSON.stringify(value));
      },
      deep: true
    }
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        }
      });
    },
    // // 进入页面搜索数据
    // getData() {
    //   this.$api.searchArticle().then(res => {
    //     if (res.code === 0) {
    //       this.tableData = res.data.articleList;
    //       this.total = res.data.total;
    //       this.loading = false;
    //     }
    //   });
    // },
    // 条件搜索
    comfirmSearch() {
      this.loading = true;
      this.form.page = 1;
      this.form.size = 10;
      // console.log(this.form)
      this.$api.searchArticle(this.form).then(res => {
        if (res.code === 0) {
          this.total = res.data.total;
          this.tableData = res.data.articleList;
          this.loading = false;
        }
      });
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
    // 更改状态
    async changeStatus(e) {
      const confirmChange = await this.$confirm("确认更改状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);
      if (confirmChange !== "confirm") {
        return this.$message.info("已取消本次操作");
      } else {
        this.loading = true;
        let params = {
          status: e.status === 1 ? 2 : 1,
          id: e.id
        };
        this.$api.ArticleStatus(params).then(res => {
          if (res.code === 0) {
            this.comfirmSearch();
            setTimeout(() => {
              this.$message.success("操作成功");
            }, 1500);
          }
        });
      }
    },
    // 进入编辑页面
    editArticle(e) {
      console.log(e);
      this.$router.push({
        path: "/addArticle",
        query: {
          id: e.id,
          page: "编辑"
        }
      });
    },
    // 删除数据
    async deleteArticle(e) {
      const confirmChange = await this.$confirm(
        "确认删除这条数据吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmChange !== "confirm") {
        return this.$message.info("已取消本次操作");
      } else {
        this.loading = true;
        this.$api.ArticleDelete(e.id).then(res => {
          if (res.code === 0) {
            this.comfirmSearch();
            setTimeout(() => {
              this.$message.success("操作成功");
            }, 1500);
          }
        });
      }
    },
    // 重置搜索
    resetSearch() {
      this.loading = true;
      this.form = {
        type: "",
        status: "",
        startAt: "",
        endAt: "",
        page: 1,
        size: 10
      };
      this.comfirmSearch();
    },

    // 每页条数改变
    handleSizeChange(e) {
      this.loading = true;
      this.form.size = e;
      // this.comfirmSearch();
      this.$api.searchArticle(this.form).then(res => {
        if (res.code === 0) {
          this.total = res.data.total;
          this.tableData = res.data.articleList;
          this.loading = false;
        }
      });
    },
    // 页码改变
    handleCurrentChange(e) {
      this.loading = true;
      this.form.page = e;
      // this.comfirmSearch();
      this.$api.searchArticle(this.form).then(res => {
        if (res.code === 0) {
          this.total = res.data.total;
          this.tableData = res.data.articleList;
          this.loading = false;
        }
      });
    },
    addArticle() {
      this.$router.push({
        path: "/addArticle",
        query: {
          page: "新增"
        }
      });
      console.log(111);
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.formBtn {
  float: right;
  margin-bottom: 20px;
}
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
