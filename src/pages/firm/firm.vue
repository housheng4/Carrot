<template>
  <div>
    <!-- 头部卡片视图 -->
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :md="8">
            <el-form-item label="公司名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="公司行业">
              <el-select v-model="form.industry" placeholder="公司行业">
                <el-option
                  v-for="item in industryOption"
                  :key="item.industry"
                  :label="item.label"
                  :value="item.industry"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="融资规模">
              <el-select v-model="form.financing" placeholder="融资规模">
                <el-option
                  v-for="item in financingOption"
                  :key="item.financing"
                  :label="item.label"
                  :value="item.financing"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="认证状态">
              <el-select v-model="form.approved" placeholder="认证状态">
                <el-option
                  v-for="item in approvedOption"
                  :key="item.approved"
                  :label="item.label"
                  :value="item.approved"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item label="冻结状态">
              <el-select v-model="form.freezed" placeholder="冻结状态">
                <el-option
                  v-for="item in freezedOption"
                  :key="item.freezed"
                  :label="item.label"
                  :value="item.freezed"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 地区选择组件 -->
          <el-col :md="24" style="display:flex">
            <el-form-item prop="province" label="地区">
              <el-select
                style="width:150px"
                @change="proChange"
                v-model="form.province"
                placeholder="请选择省份"
              >
                <el-option
                  v-for="item in proOption"
                  :key="item.ProID"
                  :label="item.ProName"
                  :value="item.ProID"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="city" label-width="10px">
              <el-select
                style="width:150px"
                @change="cityChange"
                v-model="form.city"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in cityOption"
                  :key="item.CityID"
                  :label="item.CityName"
                  :value="item.CityID"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="county" label-width="10px">
              <el-select
                style="width:150px"
                v-model="form.county"
                placeholder="请选择地区"
              >
                <el-option
                  v-for="item in countyOption"
                  :key="item.Id"
                  :label="item.countyName"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item class="submitBtn">
              <el-button type="success" size="small" @click="onSubmit"
                >搜索</el-button
              >
              <el-button type="danger" size="small" @click="onReset()"
                >清空</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 表格数据 -->
    <div class="tableContent">
      <div class="tableHeader">
        <div>
          <span>公司列表</span>
        </div>
        <el-button type="primary" size="mini" @click="addFirm">新增+</el-button>
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
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="industryList[0]" label="公司行业">
          <template slot-scope="scope">
            {{ scope.row.industryList[0] | namePipe }}
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            {{ scope.row.city | regionCity }}-{{
              scope.row.county | regionCount
            }}
          </template>
        </el-table-column>
        <el-table-column label="融资规模">
          <template slot-scope="scope">{{
            scope.row.financing | financing
          }}</template>
        </el-table-column>
        <el-table-column label="认证状态">
          <template slot-scope="scope">{{
            scope.row.approved | approved
          }}</template>
        </el-table-column>
        <el-table-column label="冻结状态">
          <template slot-scope="scope">{{
            scope.row.freezed | freezed
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="jobPage(scope.row)"
              >职位</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              @click="changeApproved(scope.row)"
              >{{ scope.row.approved == 1 ? "解除" : "认证" }}</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              type="success"
              @click="editPage(scope.row)"
              >编辑</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              @click="changeFreezed(scope.row)"
              >{{ scope.row.freezed == 1 ? "解冻" : "冻结" }}</el-button
            >
            <el-button
              slot="reference"
              size="mini"
              @click="deleteIt(scope.row)"
              type="danger"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    ></el-pagination>
  </div>
</template>

<script>
import area from "../../filters/area";
export default {
  data() {
    return {
      loading: true, //加载中效果
      // 选择框的选项
      industryOption: this.$store.state.industryOptionAll,
      financingOption: this.$store.state.financingOptionAll,
      approvedOption: this.$store.state.approvedOptionAll,
      freezedOption: this.$store.state.freezedOptionAll,
      // 表单数据用于提交
      form: {
        // 初始选项为全部，key为""
        name: "",
        firm: "",
        industry: "",
        financing: "",
        freezed: "",
        approved: "",
        province: "",
        city: "",
        county: ""
      },
      proOption: area.PROVINCE, // 省份
      cityOption: [], // 城市
      countyOption: [], // 地区
      // 表格初始数据
      tableData: [
        { name: "", industryList: [], financing: "", approved: "", freezed: "" }
      ],
      totalNum: 0, // 初始总数据数为0
      currentPage: 1, // 初始页数为1
      pageSize: 10 // 初始也展示数目为10条
    };
  },
  beforeCreate() {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    if (sessionStorage.getItem("firm")) {
      this.form = JSON.parse(sessionStorage.getItem("firm"));
    }
    if (this.form.province > 0) {
      this.cityOption = area.CITY.filter(key => {
        return key.ProID == this.form.province;
      });
    }
    if (this.form.city > 0) {
      this.countyOption = area.COUNTY.filter(key => {
        return key.CityID == this.form.city;
      });
    }
    this.onSubmit();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  watch: {
    form: {
      handler: function(value) {
        sessionStorage.setItem("firm", JSON.stringify(value));
      },
      deep: true
    }
  },
  methods: {
    // =======================================================================
    // 提交表单
    // =======================================================================
    onSubmit() {
      this.loading = true;
      this.$api
        .getSearch(this.form)
        .then(res => {
          // 搜索后页码和每页条目重置
          this.currentPage = 1;
          this.pageSize = 10;
          this.tableData = res.data;
          this.totalNum = res.total;
          this.loading = false;
        })
        .catch(err => err);
    },
    // =======================================================================
    // 重置表单
    // =======================================================================
    onReset() {
      //重置表单，这里也可以给每个item加prop，使用resetFiled方法重置
      this.form = {
        name: "",
        firm: "",
        industry: "",
        financing: "",
        freezed: "",
        approved: "",
        province: "",
        city: "",
        county: ""
      };
      this.loading = true;
      // 搜索后页码和每页条目重置
      this.currentPage = 1;
      this.pageSize = 10;
      this.onSubmit();
    },
    // =======================================================================
    // 每页多少条的回调
    // =======================================================================
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.$api
        .getSearch({ size: val })
        .then(res => {
          if (res.code === 0) {
            this.loading = false;
            this.tableData = res.data;
          }
        })
        .catch(err => err);
    },
    // =======================================================================
    // 页码改变回调
    // =======================================================================
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.$api
        .getSearch({ page: val })
        .then(res => {
          if (res.code === 0) {
            this.loading = false;
            this.tableData = res.data;
          }
        })
        .catch(err => err);
    },
    // =======================================================================
    // 更改冻结状态// 通过scope.row.id 获取id=================================
    // =======================================================================
    async changeFreezed(data) {
      let params = {
        id: data.id,
        status: data.freezed == 0 ? 1 : 0,
        type: 0 // type为0更改冻结状态，操
      };
      // 这里使用async await确认操作之后在发出请求
      const confirmResult = await this.$confirm(
        "更改冻结状态，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        this.loading = false;
        return this.$message.info("已取消本次操作");
      }
      this.loading = true;
      this.$api
        .Freezed(params)
        .then(res => {
          if (res.code === 0) {
            this.onSubmit();
            setTimeout(() => {
              this.$message.success("更改成功");
            }, 3000); // 这里延时时间以后根据情况在调
          }
        })
        .catch(err => err);
    },
    // =======================================================================
    // 更改认证状态===========================================================
    // =======================================================================
    async changeApproved(data) {
      let params = {
        id: data.id,
        status: data.approved === 1 ? 0 : 1,
        type: 1 //type为1更改认证状态，操
      };
      const confirmResult = await this.$confirm(
        "更改认证状态，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmResult !== "confirm") {
        this.loading = false;
        return this.$message.info("已取消本次操作");
      }
      this.loading = true;
      this.$api
        .Approved(params)
        .then(res => {
          if (res.code === 0) {
            this.onSubmit();
            setTimeout(() => {
              this.$message.success("更改成功");
            }, 3000); // 这里延时时间以后根据情况在调
          }
        })
        .catch(err => err);
    },
    // =======================================================================
    // 进入职位列表页
    // =======================================================================
    jobPage(e) {
      // console.log(e.name)
      this.$router.push({
        path: "/jobDetail",
        query: {
          id: e.id,
          companyName: e.name
        }
      });
    },
    // =======================================================================
    // 删除=======================================================================
    // =======================================================================
    async deleteIt(e) {
      const confirmDelete = await this.$confirm("确认要删除吗?", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      }).catch(err => err);
      if (confirmDelete !== "confirm") {
        this.loading = false;
        return this.$message.info("已取消本次操作");
      }
      this.loading = true;
      this.$api
        .deleteFirm(e.id)
        .then(res => {
          this.loading = false;
          if (res.code === 0) {
            this.onSubmit();
            setTimeout(() => {
              this.$message.success("删除成功");
            }, 2000);
          }
        })
        .catch(err => err);
    },
    addFirm() {
      this.$router.push({
        path: "/addFirm",
        query: {
          page: "新增"
        }
      });
    },
    // =======================================================================
    // 进入编辑页面
    // =======================================================================
    editPage(e) {
      this.$router.push({
        path: "/addFirm",
        query: {
          page: "编辑",
          id: e.id,
          freezed: e.freezed
        }
      });
    },
    // 省份改变的时候过滤得到对应的市
    // 省份改变是城市地区初始化为“”
    proChange(e) {
      this.form.city = "";
      this.form.county = "";
      if (e > 0) {
        this.cityOption = area.CITY.filter(key => {
          return key.ProID == e;
        });
      }
    },
    // 市改变的时候过滤得到对应的区
    // 市改变的时候地区初始化为“”
    cityChange(e) {
      // console.log(e);
      this.form.county = "";
      if (e > 0) {
        this.countyOption = area.COUNTY.filter(key => {
          return key.CityID == e;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-form-item /deep/ label {
  font-weight: 700;
}
.location {
  float: left;
  width: 100px;
  height: 40px;
  padding-right: 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
/* form表单中的按钮居右排列 */
.submitBtn {
  display: flex;
  justify-content: flex-end;
}
// 分页器居右排列
.el-pagination {
  float: right;
}
</style>
