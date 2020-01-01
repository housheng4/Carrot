// 过滤器
// 获取地址文件
import area from "./area";
const filters = {
  // 公司行业
  namePipe: function(value) {
    if (value === 0) return "移动互联网";
    if (value === 1) return "电子商务";
    if (value === 2) return "企业服务";
    if (value === 3) return "O2O";
    if (value === 4) return "教育";
    if (value === 5) return "金融";
    if (value === 6) return "游戏";
    else return "";
  },
  // 地区-市
  regionCity: function(value) {
    if (value) return area.CITY[value - 1].CityName;
  },
  // 地区-区
  regionCount: function(value) {
    if (value) return area.COUNTY[value - 1].countyName;
  },
  //融资规模
  financing: function(value) {
    if (value === 0) return "无需融资";
    if (value === 1) return "天使轮";
    if (value === 2) return "A轮";
    if (value === 3) return "B轮";
    if (value === 4) return "C轮";
    if (value === 5) return "D轮及以上";
    if (value === 6) return "上市公司";
  },
  approved: function(value) {
    if (value === 0) return "未认证";
    if (value === 1) return "已认证";
  },
  freezed: function(value) {
    if (value === 0) return "正常";
    if (value === 1) return "冻结";
  },
  // 职位列表页职位类别
  jobType: function(value) {
    if (value === 1) return "产品";
    if (value === 2) return "UI";
    if (value === 3) return "QA";
    if (value === 4) return "Android";
    if (value === 5) return "IOS";
    if (value === 6) return "Web";
    if (value === 7) return "IOS";
    if (value === 8) return "JAVA";
    if (value === 9) return "NLP";
    if (value === 10) return "DM";
    if (value === 11) return "DL";
  },
  // 职位列表页薪资
  compensationType: function(value) {
    if (value === 0) return "8K以下";
    if (value === 1) return "8-10K";
    if (value === 2) return "10K-15K";
    if (value === 3) return "15K-20K";
    if (value === 4) return "20K以上";
  },
  // 职位列表页工作经验
  experienceType: function(value) {
    if (value === 0) return "无";
    if (value === 1) return "应届";
    if (value === 2) return "0-1年";
    if (value === 3) return "1~2年";
    if (value === 4) return "3~5年";
    if (value === 5) return "6～9年";
    if (value === 6) return "10年以上";
  },
  // 职位列表页学历要求
  educationType: function(value) {
    if (value === 0) return "高中";
    if (value === 1) return "大专";
    if (value === 2) return "本科";
    if (value === 3) return "硕士";
    if (value === 4) return "博士";
  },
  // 职位列表页发布时间
  DateType: function(value) {
    // return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/,' ')
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, this.getFullYear() + "");
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    return new Date(value).Format("yy-MM-dd");
    //  return new Date(value).Format('yy-MM-dd hh:mm:ss');
  },
  // 职位列表页上下架
  statusType: function(value) {
    if (value === 0) return "下架";
    if (value === 1) return "上架";
  },
  // 英语水平
  englishLevelType: function(value) {
    if (value === 0) return "四级";
    if (value === 1) return "六级";
    if (value === 2) return "其他";
    else return "";
  },
  // Article类型
  ArticleType: function(value) {
    if (value === 0) return "首页Banner";
    if (value === 1) return "找职位Banner";
    if (value === 2) return "找精英Banner";
    if (value === 3) return "行业大图";
  }
};
export default filters;
