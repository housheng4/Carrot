// 配置跨域
module.exports = {
  chainWebpack: config => {
    // 发布模式// 生产环境的Element的CDN引入时的全局变量是 ELEMENT
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js");
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        axios: "axios",
        "element-ui": "ELEMENT"
      });
      config.plugin("html").tap(args => {
        args[0].isProd = true;
        return args;
      });
    });
    // 开发模式
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");
      config.plugin("html").tap(args => {
        args[0].isProd = false;
        return args;
      });
    });
  },
  devServer: {
    // 跨域
    proxy: {
      "/api": {
        target: "http://student.carrots.admin.xiuzhenyuan.cn",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
