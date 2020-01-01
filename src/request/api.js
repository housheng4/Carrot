import request from "./http2";
import qs from "qs";
export default class Api {
  // 登录
  static login(data) {
    return request({
      url: "/api/a/login?" + qs.stringify(data),
      method: "post"
    });
  }
  // 公司列表页展示数据
  static getFirmData() {
    return request({
      url: "/api/a/company/search",
      method: "get"
    });
  }
  // 公司列表页搜索数据
  static getSearch(data) {
    return request({
      url: "/api/a/company/search?" + qs.stringify(data),
      method: "get"
    });
  }
  // 公司列表页更改冻结状态
  static Freezed(data) {
    return request({
      url: "/api/a/u/company/status?" + qs.stringify(data),
      method: "put"
    });
  }
  // 公司列表页更改认证状态
  static Approved(data) {
    return request({
      url: "/api/a/u/company/status?" + qs.stringify(data),
      method: "put",
      data
    });
  }
  // 新增公司
  static ConfirmForm(data) {
    return request({
      url: "/api/a/u/company",
      method: "post",
      data
    });
  }
  // 删除公司
  static deleteFirm(data) {
    return request({
      url: "/api/a/u/company/" + `${data}`,
      method: "delete"
    });
  }
  // 获取公司明细信息
  static getFirmInfo(data) {
    return request({
      url: "/api/a/company/" + `${data}`,
      method: "get",
      data
    });
  }
  // 职位列表页编辑
  static changeFirmInfo(data, id) {
    return request({
      url: "/api/a/u/company/" + `${id}`,
      method: "put",
      data
    });
  }
  // 职位列表页获取职位详情
  static getJob(data) {
    return request({
      url: "/api/a/profession/search?" + qs.stringify(data),
      method: "get",
      data
    });
  }
  // 职位列表页更改上下架
  static changeStatus(data) {
    return request({
      url: "/api/a/u/profession/status?" + qs.stringify(data),
      method: "put",
      data
    });
  }
  // 职位列表页删除职位
  static deleteJobs(data) {
    return request({
      url: "/api/a/u/profession/" + `${data}`,
      method: "delete",
      data
    });
  }
  // 职位列表页编辑页面获取数据
  static editGetJobs(data) {
    return request({
      url: "/api/a/profession/" + `${data}`,
      method: "get"
    });
  }
  // 职位列表页编辑页面更改数据
  static editJobs(data, id) {
    return request({
      url: "/api/a/u/profession/" + `${id}`,
      method: "put",
      data
    });
  }
  // 职位列表页面新增页面
  static addJobs(data) {
    return request({
      url: "/api/a/u/profession",
      method: "post",
      data
    });
  }
  // Article页面搜索数据
  static searchArticle(data) {
    return request({
      url: "/api/a/article/search?" + qs.stringify(data),
      method: "get"
    });
  }
  static ArticleStatus(data) {
    return request({
      url: "/api/a/u/article/status?" + qs.stringify(data),
      method: "put"
    });
  }
  static ArticleDelete(data) {
    return request({
      url: "/api/a/u/article/" + `${data}`,
      method: "delete"
    });
  }
  // 编辑Article获取数据
  static addArticleGet(data) {
    return request({
      url: "/api/a/article/" + `${data}`,
      method: "get"
    });
  }
  // Article新增
  static addArticlePost(data) {
    return request({
      url: "/api/a/u/article",
      method: "post",
      data: qs.stringify(data)
    });
  }
  // Article编辑
  static addArticlePut(data, id) {
    return request({
      url: "/api/a/u/article/" + id,
      method: "put",
      data: qs.stringify(data)
    });
  }
  // 模块管理
  static ModuleGetID(data) {
    return request({
      url: "/api/a/u/module/?" + qs.stringify(data),
      method: "get"
    });
  }
  static ModuleGetData(data) {
    return request({
      // 这里使用repeat序列化事忽略数组下标，qs默认使用的是brackets[]，还有一种是indices[1]
      url:
        "/api/a/u/multi/module?" +
        qs.stringify(data, {
          arrayFormat: "repeat"
        }),
      method: "get"
    });
  }
  static deleteModuleApi(data) {
    return request({
      url: "/api/a/u/module/" + `${data}`,
      method: "delete"
    });
  }
  static addModuleGet(data) {
    return request({
      url: "/api/a/u/module/" + `${data}`,
      method: "get"
    });
  }
  static addModule(data) {
    return request({
      url: "/api/a/u/module",
      method: "post",
      data: qs.stringify(data)
    });
  }
  static addModulePut(data, id) {
    return request({
      url: "/api/a/u/module/" + `${id}`,
      method: "put",
      data: qs.stringify(data)
    });
  }
  static addRoleGetId(data) {
    return request({
      url: "/api/a/u/role/?" + qs.stringify(data),
      method: "get"
    });
  }
  static addRoleGetRole(data) {
    return request({
      url:
        "/api/a/u/multi/role?" +
        qs.stringify(data, {
          arrayFormat: "repeat"
        }),
      method: "get"
    });
  }
  static deleteRole(data) {
    return request({
      url: "/api/a/u/role/" + `${data}`,
      method: "delete"
    });
  }
  static addRolePost(data) {
    return request({
      url: "/api/a/u/role",
      method: "post",
      data: qs.stringify(data)
    });
  }
  static addRolePut(data) {
    return request({
      url: "/api/a/u/role?" + qs.stringify(data),
      method: "put"
    });
  }
}
