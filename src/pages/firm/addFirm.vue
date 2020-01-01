<!--  -->
<template>
  <div>
    <el-form
      :model="addForm"
      ref="addFormRef"
      :rules="addFormRules"
      label-width="100px"
    >
      <div class="header">
        <div>详细信息</div>
        <el-form-item>
          <el-select size="mini" clearable v-model="addForm.approved">
            <el-option
              v-for="item in approvedOption"
              :value="item.approved"
              :key="item.approved"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-card>
        <el-row>
          <el-col :md="8">
            <el-form-item prop="name" label="公司名称">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item prop="slogan" label="公司Slogan">
              <el-input v-model="addForm.slogan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item prop="totalNum" label="公司人数">
              <el-select
                clearable
                v-model="addForm.totalNum"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in totalNumOption"
                  :key="item.totalNum"
                  :label="item.label"
                  :value="item.totalNum"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item prop="financing" label="融资规模">
              <el-select
                clearable
                v-model="addForm.financing"
                placeholder="请选择"
              >
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
            <el-form-item prop="userNumber" label="用户数量">
              <el-select
                clearable
                v-model="addForm.userNumber"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in userNumberOption"
                  :key="item.userNumber"
                  :label="item.label"
                  :value="item.userNumber"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8">
            <el-form-item prop="profit" label="盈利情况">
              <el-select
                clearable
                v-model="addForm.profit"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in profitOption"
                  :key="item.profit"
                  :label="item.label"
                  :value="item.profit"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" style=" display:flex">
            <el-form-item prop="province" label="地区">
              <el-select
                style="width:150px"
                @change="proChange"
                v-model="addForm.province"
              >
                <el-option
                  v-for="item in proOption"
                  :key="item.ProID"
                  :label="item.ProName"
                  :value="item.ProID"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="city" label-width="0">
              <el-select
                style="width:150px"
                @change="cityChange"
                v-model="addForm.city"
              >
                <el-option
                  v-for="item in cityOption"
                  :key="item.CityID"
                  :label="item.CityName"
                  :value="item.CityID"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="county" label-width="0">
              <el-select style="width:150px" v-model="addForm.county">
                <el-option
                  v-for="item in countyOption"
                  :key="item.Id"
                  :label="item.countyName"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24">
            <el-col :md="8">
              <el-form-item prop="industryList" label="行业">
                <el-select
                  class="industry"
                  @change="changeSelect"
                  v-model="addForm.industryList"
                  clearable
                  multiple
                  placeholder="请选择"
                >
                  <!-- checkbox实现多选功能 -->
                  <el-checkbox v-model="checked" @change="selectAll"
                    >全选</el-checkbox
                  >
                  <el-option
                    v-for="item in industryOption"
                    :key="item.industry"
                    :label="item.label"
                    :value="item.industry"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col>
            <el-form-item label="公司Logo" prop="logo">
              <el-upload
                action="/api/a/u/img/hsimg"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="loadSuccess"
                :limit="1"
                :file-list="fileList"
                v-model="addForm.logo"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="summary" label="公司介绍">
              <el-input
                type="textarea"
                v-model="addForm.summary"
                maxlength="1000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="公司福利">
              <el-input
                type="textarea"
                v-model="addForm.companyWelfare"
                maxlength="1000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="公司标签">
              <el-checkbox-group v-model="addForm.companyLable">
                <el-checkbox
                  v-for="item in addFormLabelOption"
                  :label="item.La"
                  :key="item.La"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <div class="tableHeader">
            <div>
              <span>公司产品</span>
            </div>
            <!-- <el-button type="primary" size="mini" @click="addFirm">新增+</el-button> -->
          </div>
          <el-card>
            <el-col :md="12">
              <el-form-item label="产品名称">
                <el-input v-model="productList[0].name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="产品Slogan">
                <el-input v-model="productList[0].slogan"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="产品Logo" prop="productLogo">
                <el-upload
                  action="/api/a/u/img/hsimg"
                  list-type="picture"
                  :on-preview="handlePictureCardPreview1"
                  :on-remove="handleRemove1"
                  :on-success="loadSuccess1"
                  :limit="1"
                  :file-list="fileList1"
                  v-model="productList[0].logo"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible1">
                  <img width="100%" :src="dialogImageUrl1" alt />
                </el-dialog>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="产品简介">
                <el-input
                  type="textarea"
                  v-model="productList[0].summary"
                  maxlength="1000"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-card>
          <div class="tableHeader">
            <div>
              <span>招聘公司相关信息</span>
            </div>
            <!-- <el-button type="primary" size="mini" @click="addFirm">新增+</el-button> -->
          </div>
          <el-card>
            <el-col :md="8">
              <el-form-item prop="companyRelation" label="公司联系人">
                <el-input v-model="addForm.companyRelation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item prop="phone" label="联系电话">
                <el-input v-model="addForm.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item prop="mail" label="邮箱">
                <el-input v-model="addForm.mail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24">
              <el-form-item prop="address" label="详细地址">
                <el-input v-model="addForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="地图" prop="map">
                <el-upload
                  action="/api/a/u/img/hsimg"
                  list-type="picture"
                  :on-preview="handlePictureCardPreview2"
                  :on-remove="handleRemove2"
                  :on-success="loadSuccess2"
                  :limit="1"
                  :file-list="fileList2"
                  v-model="addForm.map"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible2">
                  <img width="100%" :src="dialogImageUrl2" alt />
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-card>
          <el-col>
            <el-button class="FormBtn" type="danger" @click="cancelForm"
              >取 消</el-button
            >
            <el-button
              class="FormBtn"
              type="success"
              @click="confirmForm"
              :disabled="disabledBtn"
              >保 存</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import area from "../../filters/area";
export default {
  data() {
    // 校验邮箱
    let checkEmail = (rule, value, cb) => {
      //   验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return cb();
      }
      if (!value) return cb();
      cb(new Error("邮箱格式错误"));
    };
    // 校验手机号
    let checkMobile = (rule, value, cb) => {
      //   验证邮箱的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        // 合法手机号
        return cb();
      }
      if (!value) return cb();
      cb(new Error("请输入正确手机号"));
    };
    return {
      disabledBtn: true,
      addForm: {
        address: "", // 详细地址
        approved: 0, // 认证状态默认未认证0
        city: "", // 城市1
        companyLable: [],
        companyRelation: "", //公司联系人
        companyWelfare: "", // 公司福利
        county: "", // 地区1
        financing: "", // 融资规模1
        id: "", // 1
        logo: "",
        mail: "", //email
        map: "", // 地图
        name: "", // 公司名称
        phone: "", // 电话
        profit: "", // 盈利情况
        province: "", // 省份
        slogan: "", // Slogan
        summary: "", // 公司介绍
        totalNum: "", // 公司人数1
        userNumber: "", // 用户数量
        industryList: []
      },
      industryList: [],
      productList: [{ name: "", slogan: "", summary: "", logo: "" }],
      page: "", // 判断是新增还是编辑
      id: Number, // 判断编辑的id
      freezed: "",
      addFormLabelOption: this.$store.state.addFormLabelOption,
      approvedOption: this.$store.state.approvedOption, // 认证状态
      totalNumOption: this.$store.state.totalNumOption, // 公司人数
      financingOption: this.$store.state.financingOption, // 融资规模
      userNumberOption: this.$store.state.userNumberOption, // 用户数量
      profitOption: this.$store.state.profitOption, // 盈利情况
      industryOption: this.$store.state.industryOption, // 行业
      checked: false, // 行业多选框默认不全选
      proOption: area.PROVINCE, // 省份
      cityOption: [], // 城市
      countyOption: [], // 地区
      fileList: [],
      fileList1: [],
      fileList2: [],
      dialogImageUrl: "", // 缩略图文件url
      dialogVisible: false, // 默认不展示缩略图
      dialogImageUrl1: "", // 缩略图文件url
      dialogVisible1: false, // 默认不展示缩略图
      dialogImageUrl2: "", // 缩略图文件url
      dialogVisible2: false, // 默认不展示缩略图
      addFormRules: {
        name: [{ required: true, message: "请输入公司名称" }],
        slogan: [{ required: true, message: "请输入公司Solgan" }],
        totalNum: [{ required: true, message: "请输入公司人数" }],
        financing: [{ required: true, message: "请输入融资规模" }],
        province: [{ required: true, message: "请输入地区" }],
        city: [{ required: true, message: "请输入地区" }],
        industryList: [{ required: true, message: "请输入行业" }],
        logo: [{ required: true, message: "请上传公司LOGO" }],
        summary: [{ required: true, message: "请输入公司介绍" }],
        mail: [
          { required: false, message: "请输入邮箱", trigger: "change" },
          { validator: checkEmail, trigger: "change" }
        ],
        phone: [
          { required: false, message: "请输入手机号", trigger: "change" },
          { validator: checkMobile, trigger: "change" }
        ]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.freezed = this.$route.query.freezed;
    this.page = this.$route.query.page;
    this.id = this.$route.query.id;
    if (this.page === "编辑") {
      this.getFirmData();
    }
  },
  // 通过watch实时的监控表单数据到达实时改变按钮的禁用状态
  watch: {
    addForm: {
      handler: function(val) {
        if (
          !(
            val.name &&
            val.slogan &&
            val.totalNum >= 0 &&
            val.financing >= 0 &&
            val.province &&
            val.city &&
            val.logo &&
            val.industryList.length > 0 &&
            val.summary
          )
        ) {
          this.disabledBtn = true;
        } else {
          this.disabledBtn = false;
        }
      },
      deep: true //对象的深度验证
    }
  },
  methods: {
    // 图片移除的回调
    handleRemove() {
      this.addForm.logo = "";
    },
    // 控制显示缩略图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    loadSuccess(e) {
      this.addForm.logo = e.data.url;
      this.$message.success("上传成功");
    },
    // 图片移除的回调
    handleRemove2() {
      this.addForm.map = "";
    },
    // 控制显示缩略图
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    // 图片上传成功
    loadSuccess2(e) {
      this.addForm.map = e.data.url;
      this.$message.success("上传成功");
    },
    // 图片移除的回调
    handleRemove1() {
      this.productList[0].logo = "";
    },
    // 控制显示缩略图
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    // 图片上传成功
    loadSuccess1(e) {
      this.productList[0].logo = e.data.url;
      this.$message.success("上传成功");
    },
    // 省份改变的时候过滤得到对应的市
    // 省份改变是城市地区初始化为“”
    proChange(e) {
      this.addForm.city = "";
      this.addForm.county = "";
      if (e > 0) {
        this.cityOption = area.CITY.filter(key => {
          return key.ProID == e;
        });
      }
    },
    // 市改变的时候过滤得到对应的区
    // 市改变的时候地区初始化为“”
    cityChange(e) {
      this.addForm.county = "";
      if (e > 0) {
        this.countyOption = area.COUNTY.filter(key => {
          return key.CityID == e;
        });
      }
    },
    // ===================================================
    //   多选框的全选功能
    selectAll() {
      this.addForm.industryList = []; // 保证多次点击不重复叠加
      // 点击全选按钮，选中所有项
      if (this.checked) {
        this.industryOption.map(item => {
          this.addForm.industryList.push(item.industry);
        });
      } else {
        this.industryList = [];
      }
    },
    // 如果手动选全部，全选按钮亮起
    changeSelect(val) {
      if (val.length === this.industryOption.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    // ===================================================
    //取消按钮，返回职位列表页
    cancelForm() {
      this.$router.push("/firm");
    },
    confirmForm() {
      // 把companylabel转为JSON格式
      this.addForm.companyLable = JSON.stringify(this.addForm.companyLable);
      // 这里把addForm下的industryList赋值给data下industryList变量中，key为industry
      for (let i = 0; i < this.addForm.industryList.length; i++) {
        this.industryList.push({ industry: this.addForm.industryList[i] });
      }
      let params = {
        industryList: this.industryList,
        productList: this.productList
      };
      // 深拷贝一个 params.company，防止后续操作更改原addForm.company
      params.company = JSON.parse(JSON.stringify(this.addForm));
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          // 验证表单
          if (this.page === "新增") {
            // 把addForm下的industryList删除。他存在的意义是为了表单验证
            // 删除的是深拷贝后的，不会通过原型链更改addForm，目的是防止影响watch方法观察addForm数据变化
            delete params.company.industryList;
            this.$api
              .ConfirmForm(params)
              .then(res => {
                if (res.code === 0) {
                  this.$router.push("/firm");
                } else {
                  this.$message.info("新增失败");
                }
              })
              .catch(err => err);
          }
          if (this.page === "编辑") {
            delete params.company.industryList;
            params.company.freezed = this.freezed;
            this.$api
              .changeFirmInfo(params, this.id)
              .then(res => {
                if (res.code === 0) {
                  this.$router.push("/firm");
                } else {
                  this.$message.warning("编辑失败");
                }
              })
              .catch(err => err);
          }
        } else {
          console.log("缺少必填项");
          return false;
        }
      });
    },
    // 获取公司明细信息
    getFirmData() {
      this.$api
        .getFirmInfo(this.id)
        .then(res => {
          if (res.code === 0) {
            this.addForm.logo = res.data.company.logo;
            this.addForm.name = res.data.company.name;
            this.addForm.address = res.data.company.address;
            this.addForm.approved = res.data.company.approved;
            // 需要解开JSON格式
            this.addForm.companyLable = res.data.company.companyLable
              ? JSON.parse(res.data.company.companyLable)
              : "";
            // 判断解开的是否还是string，因为部分数据需要双重解开JSON
            if (typeof this.addForm.companyLable == "string") {
              this.addForm.companyLable = JSON.parse(this.addForm.companyLable);
              console.log(
                typeof this.addForm.companyLable,
                this.addForm.companyLable
              );
            }
            this.addForm.companyRelation = res.data.company.companyRelation;
            this.addForm.companyWelfare = res.data.company.companyWelfare;
            this.addForm.financing = res.data.company.financing;
            this.addForm.id = this.id;
            // 给fileList数组添加对象{url：值}来显示图片
            this.fileList.push({ url: res.data.company.logo });
            this.addForm.logo = res.data.company.logo;
            // 地图图片功能等待接口
            this.addForm.map = res.data.company.map;
            if (res.data.company.map) {
              this.fileList2.push({ url: res.data.company.map });
            }

            this.addForm.mail = res.data.company.mail;
            // 显示地区选择框
            this.addForm.phone = res.data.company.phone;
            this.addForm.profit = res.data.company.profit
              ? JSON.parse(res.data.company.profit)
              : "";

            this.addForm.province = res.data.company.province
              ? JSON.parse(res.data.company.province)
              : "";
            this.addForm.city = res.data.company.city
              ? JSON.parse(res.data.company.city)
              : "";
            this.addForm.county = res.data.company.county
              ? JSON.parse(res.data.company.county)
              : "";
            // 通过得到的省份id获得对应的市级列表
            this.cityOption = area.CITY.filter(key => {
              return key.ProID == this.addForm.province;
            });
            // 通过得到的市级id获得对应的区级列表
            this.countyOption = area.COUNTY.filter(key => {
              return key.CityID == this.addForm.city;
            });

            this.addForm.slogan = res.data.company.slogan;
            this.addForm.summary = res.data.company.summary;
            this.addForm.totalNum = res.data.company.totalNum;
            this.addForm.userNumber = res.data.company.userNumber
              ? JSON.parse(res.data.company.userNumber)
              : "";
            // 展示行业多选项 取出行业数组中的value对象中的值放到对应数组下
            for (let key in res.data.industryList) {
              this.addForm.industryList.push(
                res.data.industryList[key].industry
              );
            }
            // 产品列表
            this.productList = res.data.productList;
            if (res.data.productList[0].logo) {
              this.fileList1.push({ url: res.data.productList[0].logo });
            }
          }
          // 请求失败
          else {
            this.$message.info("请求公司信息失败");
          }
        })
        .catch(err => err);
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-select {
  width: 100%;
}
.FormBtn {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
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
