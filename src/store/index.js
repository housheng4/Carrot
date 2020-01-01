import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userRole: "",
    userInfo: [],
    // 认证状态
    approvedOptionAll: [
      {
        approved: "",
        label: "全部"
      },
      {
        approved: 0,
        label: "未认证"
      },
      {
        approved: 1,
        label: "已认证"
      }
    ],
    approvedOption: [
      // { approved: "", label: "全部" },
      {
        approved: 0,
        label: "未认证"
      },
      {
        approved: 1,
        label: "已认证"
      }
    ],
    // 冻结状态
    freezedOptionAll: [
      {
        freezed: "",
        label: "全部"
      },
      {
        freezed: 0,
        label: "正常"
      },
      {
        freezed: 1,
        label: "冻结"
      }
    ],
    // 公司人数
    totalNumOption: [
      // { totalNum: "", label: "请选择" },
      {
        totalNum: 0,
        label: "1-10人"
      },
      {
        totalNum: 1,
        label: "10-20人"
      },
      {
        totalNum: 2,
        label: "30-50人"
      },
      {
        totalNum: 3,
        label: "50-100人"
      },
      {
        totalNum: 4,
        label: "100-200人"
      },
      {
        totalNum: 5,
        label: "200-500人"
      },
      {
        totalNum: 6,
        label: "500-1000人"
      },
      {
        totalNum: 7,
        label: "1000人以上"
      }
    ],
    // 融资规模
    financingOptionAll: [
      {
        financing: "",
        label: "全部"
      },
      {
        financing: 0,
        label: "无需融资"
      },
      {
        financing: 1,
        label: "天使轮"
      },
      {
        financing: 2,
        label: "A轮"
      },
      {
        financing: 3,
        label: "B轮"
      },
      {
        financing: 4,
        label: "C轮"
      },
      {
        financing: 5,
        label: "D轮及以上"
      },
      {
        financing: 6,
        label: "上市公司"
      }
    ],
    financingOption: [
      // { financing: "", label: "请选择" },
      {
        financing: 0,
        label: "无需融资"
      },
      {
        financing: 1,
        label: "天使轮"
      },
      {
        financing: 2,
        label: "A轮"
      },
      {
        financing: 3,
        label: "B轮"
      },
      {
        financing: 4,
        label: "C轮"
      },
      {
        financing: 5,
        label: "D轮及以上"
      },
      {
        financing: 6,
        label: "上市公司"
      }
    ],
    // 用户数量
    userNumberOption: [
      // { userNumber: "", label: "请选择" },
      {
        userNumber: 0,
        label: "不限"
      },
      {
        userNumber: 1,
        label: "1W-10W"
      },
      {
        userNumber: 2,
        label: "10W-50W"
      },
      {
        userNumber: 3,
        label: "50W-100W"
      },
      {
        userNumber: 4,
        label: "100W-1000W"
      },
      {
        userNumber: 5,
        label: "1000W以上"
      }
    ],
    // 盈利情况
    profitOption: [
      // { profit: "", label: "请选择" },
      {
        profit: 0,
        label: "不限"
      },
      {
        profit: 1,
        label: "亏损"
      },
      {
        profit: 2,
        label: "平衡"
      },
      {
        profit: 3,
        label: "盈利"
      },
      {
        profit: 4,
        label: "其他"
      }
    ],
    // 行业
    industryOptionAll: [
      {
        industry: "",
        label: "全部"
      },
      {
        industry: 0,
        label: "移动互联网"
      },
      {
        industry: 1,
        label: "电子商务"
      },
      {
        industry: 2,
        label: "企业服务"
      },
      {
        industry: 3,
        label: "O2O"
      },
      {
        industry: 4,
        label: "教育"
      },
      {
        industry: 5,
        label: "金融"
      },
      {
        industry: 6,
        label: "游戏"
      }
    ],
    industryOption: [
      {
        industry: 0,
        label: "移动互联网"
      },
      {
        industry: 1,
        label: "电子商务"
      },
      {
        industry: 2,
        label: "企业服务"
      },
      {
        industry: 3,
        label: "O2O"
      },
      {
        industry: 4,
        label: "教育"
      },
      {
        industry: 5,
        label: "金融"
      },
      {
        industry: 6,
        label: "游戏"
      }
    ],
    // 公司标签
    addFormLabelOption: [
      {
        label: "管理扁平",
        La: 0
      },
      {
        label: "发展前景好",
        La: 1
      },
      {
        label: "成长空间大",
        La: 2
      },
      {
        label: "五险一金",
        La: 3
      },
      {
        label: "股票期权",
        La: 4
      },
      {
        label: "系统培训",
        La: 5
      },
      {
        label: "年底双薪",
        La: 6
      },
      {
        label: "高效自由",
        La: 7
      },
      {
        label: "氛围好",
        La: 8
      },
      {
        label: "免费旅游",
        La: 9
      },
      {
        label: "餐补",
        La: 10
      },
      {
        label: "固定团建",
        La: 11
      },
      {
        label: "大牛带领",
        La: 12
      },
      {
        label: "弹性工作制",
        La: 13
      },
      {
        label: "带薪假期",
        La: 14
      },
      {
        label: "平台广阔",
        La: 15
      },
      {
        label: "免费零食",
        La: 16
      }
    ],
    workExperience: [
      {
        experience: "",
        label: "全部"
      },
      {
        experience: 0,
        label: "无"
      },
      {
        experience: 1,
        label: "应届"
      },
      {
        experience: 2,
        label: "0-1年"
      },
      {
        experience: 3,
        label: "1-2年"
      },
      {
        experience: 4,
        label: "3-5年"
      },
      {
        experience: 5,
        label: "6-9年"
      },
      {
        experience: 6,
        label: "10年以上"
      }
    ],
    // 职位详情页的工作经验
    workExperienceJob: [
      {
        experience: 0,
        label: "无"
      },
      {
        experience: 1,
        label: "应届"
      },
      {
        experience: 2,
        label: "0-1年"
      },
      {
        experience: 3,
        label: "1-2年"
      },
      {
        experience: 4,
        label: "3-5年"
      },
      {
        experience: 5,
        label: "6-9年"
      },
      {
        experience: 6,
        label: "10年以上"
      }
    ],
    educationOption: [
      {
        education: "",
        label: "全部"
      },
      {
        education: 0,
        label: "高中"
      },
      {
        education: 1,
        label: "大专"
      },
      {
        education: 2,
        label: "本科"
      },
      {
        education: 3,
        label: "硕士"
      },
      {
        education: 4,
        label: "博士"
      }
    ],
    // 职位详情页的教育要求
    educationOptionJob: [
      {
        education: 0,
        label: "高中"
      },
      {
        education: 1,
        label: "大专"
      },
      {
        education: 2,
        label: "本科"
      },
      {
        education: 3,
        label: "硕士"
      },
      {
        education: 4,
        label: "博士"
      }
    ],
    categoryOption: [
      {
        category: "",
        label: "全部"
      },
      {
        category: 1,
        label: "产品"
      },
      {
        category: 2,
        label: "UI"
      },
      {
        category: 3,
        label: "QA"
      },
      {
        category: 4,
        label: "Android"
      },
      {
        category: 5,
        label: "IOS"
      },
      {
        category: 6,
        label: "WEB"
      },
      {
        category: 7,
        label: "OP"
      },
      {
        category: 8,
        label: "JAVA"
      },
      {
        category: 9,
        label: "NLP"
      },
      {
        category: 10,
        label: "DM"
      },
      {
        category: 11,
        label: "DL"
      }
    ],
    // 职位详情页的职位分类
    categoryOptionJob: [
      {
        category: 1,
        label: "产品"
      },
      {
        category: 2,
        label: "UI"
      },
      {
        category: 3,
        label: "QA"
      },
      {
        category: 4,
        label: "Android"
      },
      {
        category: 5,
        label: "IOS"
      },
      {
        category: 6,
        label: "WEB"
      },
      {
        category: 7,
        label: "OP"
      },
      {
        category: 8,
        label: "JAVA"
      },
      {
        category: 9,
        label: "NLP"
      },
      {
        category: 10,
        label: "DM"
      },
      {
        category: 11,
        label: "DL"
      }
    ],
    statusOption: [
      {
        status: "",
        label: "全部"
      },
      {
        status: 1,
        label: "上架"
      },
      {
        status: 0,
        label: "下架"
      }
    ],
    compensationOption: [
      {
        compensation: "",
        label: "全部"
      },
      {
        compensation: 0,
        label: "8K以下"
      },
      {
        compensation: 1,
        label: "8-10K"
      },
      {
        compensation: 2,
        label: "10-15K"
      },
      {
        compensation: 3,
        label: "15-20K"
      },
      {
        compensation: 4,
        label: "20K以上"
      }
    ],
    // 职位详情页的薪资
    compensationOptionJob: [
      {
        compensation: 0,
        label: "8K以下"
      },
      {
        compensation: 1,
        label: "8-10K"
      },
      {
        compensation: 2,
        label: "10-15K"
      },
      {
        compensation: 3,
        label: "15-20K"
      },
      {
        compensation: 4,
        label: "20K以上"
      }
    ],
    // 职业详情页职位的推荐或普通
    jobRecommend: [
      {
        recommend: 0,
        label: "普通"
      },
      {
        recommend: 1,
        label: "推荐"
      }
    ],
    // 职位详情页职位次级分类
    subCategoryOption: [
      {
        subCategory: 1,
        label: "初级"
      },
      {
        subCategory: 2,
        label: "中级"
      },
      {
        subCategory: 3,
        label: "高级"
      }
    ],
    // 职位详情页工作性质
    natureOption: [
      {
        nature: 0,
        label: "全职"
      },
      {
        nature: 1,
        label: "兼职"
      },
      {
        nature: 2,
        label: "实习"
      }
    ],
    // 大数据开发经验
    bigDataOption: [
      {
        bigData: "",
        label: "不限"
      },
      {
        bigData: 0,
        label: "有"
      },
      {
        bigData: 1,
        label: "无"
      }
    ],
    // 英语水平
    englishLevelOption: [
      {
        englishLevel: "",
        label: "不限"
      },
      {
        englishLevel: 0,
        label: "四级"
      },
      {
        englishLevel: 1,
        label: "六级"
      },
      {
        englishLevel: 2,
        label: "其他"
      }
    ],
    // BAT经验
    batOption: [
      {
        bat: "",
        label: "不限"
      },
      {
        bat: 0,
        label: "有"
      },
      {
        bat: 1,
        label: "无"
      }
    ],
    // Article类型
    ArticleType: [
      {
        type: "",
        label: "全部"
      },
      {
        type: 0,
        label: "首页Banner"
      },
      {
        type: 1,
        label: "找职位Banner"
      },
      {
        type: 2,
        label: "找精英Banner"
      },
      {
        type: 3,
        label: "行业大图"
      }
    ],
    // Article状态
    ArticleStatus: [
      {
        status: "",
        label: "全部"
      },
      {
        status: 2,
        label: "上线"
      },
      {
        status: 1,
        label: "草稿"
      }
    ],
    // addArticle类型
    addArticleType: [
      {
        type: "",
        label: "请选择"
      },
      {
        type: 0,
        label: "首页Banner"
      },
      {
        type: 1,
        label: "找职位Banner"
      },
      {
        type: 2,
        label: "找精英Banner"
      },
      {
        type: 3,
        label: "行业大图"
      }
    ],
    // Article行业大图industry
    addArticleIndustry: [
      {
        industry: "",
        label: "请选择"
      },
      {
        industry: 0,
        label: "移动互联网"
      },
      {
        industry: 1,
        label: "电子商务"
      },
      {
        industry: 2,
        label: "企业服务"
      },
      {
        industry: 3,
        label: "O2O"
      },
      {
        industry: 4,
        label: "教育"
      },
      {
        industry: 5,
        label: "金融"
      },
      {
        industry: 6,
        label: "游戏"
      }
    ]
  },

  mutations: {
    saveUserInfo(state) {
      state.userName = sessionStorage.getItem("managerName");
      state.userRole = sessionStorage.getItem("userRole");
    }
  },
  actions: {},
  modules: {}
});
