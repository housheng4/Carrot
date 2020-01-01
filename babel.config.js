const proPlugins = [];
if (process.env.NODE_ENV === "production") {
  proPlugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 发布产品时的插件数组
    ...proPlugins
  ]
};
