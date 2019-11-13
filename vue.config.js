const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  outputDir: "docs",
  publicPath: "./",
  lintOnSave: false,
  pages: {
    index: {
      entry: "dev/index.ts",
      template: "dev/index.html",
      filename: "index.html"
    }
  },
  css: {
    // modules: true,// 开启CSS module
    loaderOptions: {
      less: { javascriptEnabled: true }
    }
  },
  configureWebpack: config => {
    config.module.rules.push({
      // 处理markdown文件
      test: /\.md$/,
      use: [
        { loader: "vue-loader" },
        { loader: require.resolve("./script/md.loader.js") }
      ]
    });
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: require.resolve("./dev/index.html"),
          to: "docs/",
          toType: "dir"
        }
      ])
    );
  }
};
