<!-- 侧边栏 -->
<template>
  <el-aside style="width:250px;background-color:#f19856">
    <el-menu
      :collapse-transition="false"
      unique-opened
      router
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
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
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
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
  created() {
    // 声明周期函数
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
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
/deep/.el-menu {
  border: none;
  background-color: #f19856;
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
}
</style>
