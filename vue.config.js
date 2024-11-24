const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    // disableHostCheck: true,
    historyApiFallback: true,
    allowedHosts: "all",
    port: 8111,
    open: true,
    https: false,
    // 禁用 overlay，这样即使编译过程中出现错误或警告，它们不会在浏览器页面上以覆盖层的形式显示
    client: {
      overlay: false,
    },
    proxy: {
      // 匹配所有到 /api 的请求
      "/api": {
        target: "http://example.com", // 目标服务器
        changeOrigin: true, // 改变源
        pathRewrite: {
          "^/api": "", // 重写路径：移除路径中的 /api 部分
        },
      },
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
});
