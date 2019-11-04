module.exports = {
  outputDir: 'docs',
  publicPath: './',
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
      use: [{ loader: "vue-loader" }, { loader: require.resolve('./md.loader.js') }]
    })
  }
}
