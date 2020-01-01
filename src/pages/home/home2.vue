<!--  -->
<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header class="clearfix" style="background-color: #f19856;">
      <div class="topbar-left">
        <span>萝卜多后台管理系统</span>
        <button class="asideBtn" @click="changeAside">
          <span class="iconBtn"></span>
          <span class="iconBtn"></span>
          <span class="iconBtn"></span>
        </button>
      </div>
      <div class="topbar-right">
        <ul>
          <li>
            <a>
              <!-- 用户信息 -->
              <span>{{ $store.state.userRole }}</span>
            </a>
          </li>
          <li>
            <span>|</span>
          </li>
          <li>
            <!-- 用户名 -->
            <a>{{ $store.state.userName }}</a>
          </li>
          <li>
            <span>|</span>
          </li>
          <li>
            <!-- 登出 -->
            <a @click="logout">
              <i class="el-icon-switch-button"></i>
            </a>
          </li>
        </ul>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside v-if="collapse">
        <el-menu
          :collapse-transition="false"
          unique-opened
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              @click="saveNavState('/' + subItem.path)"
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <!-- 文本 -->
              <span style="padding-left: 10px;">{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 显示隐藏侧边栏
      collapse: true,
      menulist: [
        {
          authName: "信息管理",
          id: 1,
          children: [
            { authName: "公司列表", path: "firm", id: 2 },
            { authName: "职位列表", path: "job", id: 3 }
          ]
        },
        {
          authName: "Article管理",
          id: 4,
          children: [{ authName: "Article列表", path: "article", id: 5 }]
        },
        {
          authName: "人才管理",
          id: 6,
          children: [
            { authName: "候选人列表", path: "candidate", id: 7 },
            { authName: "人才列表", path: "talents", id: 8 }
          ]
        },
        {
          authName: "推荐管理",
          id: 9,
          children: [
            { authName: "推荐人管理", path: "referrer", id: 10 },
            { authName: "推荐管理测试best", path: "moduleTest", id: 11 }
          ]
        },
        {
          authName: "后台管理",
          id: 12,
          children: [
            { authName: "模块管理", path: "module", id: 13 },
            { authName: "角色管理", path: "role", id: 14 },
            { authName: "密码修改", path: "password", id: 15 },
            { authName: "账户管理", path: "accout", id: 16 }
          ]
        }
      ],
      // 被激活的链接
      activePath: ""
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 声明周期函数
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  mounted() {
    // 获取用户信息
    this.$store.commit("saveUserInfo");
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
    changeAside() {
      this.collapse = !this.collapse;
    }
  }
};
</script>
<style lang="less" scoped>
// 头部
.el-header {
  padding: 0;
  height: 50px !important;
}
// 头部左侧
.topbar-left {
  float: left;
  height: 50px;
  padding: 15px 37px;
  font-size: 18px;
  line-height: 20px;
  color: white;
  border-bottom: solid #fdbb6b 1px;
  width: 250px;
  box-sizing: border-box;
}
// 头部右侧，列表横向排列，居右，更改a标签样式，添加hover效果
.topbar-right {
  float: right;
  width: calc(100% - 250px);
  background-color: #fff;
  ul {
    float: right;
    padding: 0 15px 0 0;
    margin: 0;
  }
  li {
    display: inline-block;
    a {
      display: inline-block;
      vertical-align: middle;
      margin: 0 5px;
      padding: 15px;
      min-height: 50px;
      box-sizing: border-box;
      font-size: 14px;
      text-decoration: none;
      color: #337ab7;
      &:hover {
        background-color: #eee;
        color: #23527c;
      }
    }
  }
}
// 更改关闭图标样式
.el-icon-switch-button {
  font-size: 16px;
  color: #fdbb6b !important;
  font-weight: 900;
}
.el-main {
  background-color: #f5f5f5;
  min-height: calc(100vh - 50px);
  max-width: calc(100% - 250px);
}

i {
  font-size: 20px !important;
  color: #fff !important;
}
.icon {
  margin-right: 10px;
}
.toggle-button {
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
.asideBtn {
  display: none;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 9px 10px;
  border: 1px solid #fff;
  border-radius: 3px;
  background-color: #f9a84f;
  cursor: pointer;
  outline: none;
  .iconBtn {
    display: block;
    width: 22px;
    height: 2px;
    margin-top: 3px;
    background-color: #fff;
  }
}
// 更改菜单样式

/deep/.el-aside {
  width: 250px !important;
  background-color: transparent;
  padding-top: 30px;
}

/deep/.el-menu {
  border: none;
  background-color: transparent;
  .el-submenu__title,
  .el-menu-item {
    color: #fff;
  }
  .el-submenu__title:hover {
    background-color: #feae45;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #feae45;
  }
  // 更改箭头的颜色
  .el-icon-arrow-down {
    float: right;
    padding-right: 40px;
    font-size: 18px;
    color: #fff;
    &::before {
      content: "\e6de";
    }
  }
  // 更改箭头样式
  .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(0);
    &::before {
      content: "\e6df";
    }
  }
  // 激活状态的背景颜色
  .el-menu > .is-active {
    background-color: #feae45;
  }
  .is-opened > .el-submenu__title {
    border-left: 2px solid #fff;
  }
}
@media all and (max-width: 768px) {
  .el-header {
    height: 100px !important;
  }
  .topbar-left {
    width: 100%;
  }
  .topbar-right {
    width: 100%;
  }
  .el-container {
    flex-direction: column;
    .el-aside {
      width: 100% !important;
    }
  }
  /deep/.el-aside {
    width: 100%;
  }
  .el-main {
    max-width: 100% !important;
  }
  .asideBtn {
    display: block;
  }
}
</style>
