module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
        //'last 10 versions', // 所有主流浏览器最近2个版本
      ],
      grid: true
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, //视口的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, //视口的高度，对应的是我们设计稿的高度。（也可以不配置）
      unitPrecision: 5, //指定'px'转换为'vw或vh'时要保留的小数位数
      viewportUnit: 'vw', //指定需要转换为视口的单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'], //指定不需要转换单位的类，即类名中包含这些字符串的都不会转换
      minPixelValue: 1, //小于或等于'1px'不转换为'vw or vh'
      mediaQuery: false, //不允许在媒体查询中转换'px'
      exclude: [/TabBar\.vue$/, /node_modules/], //必须是正则表达式，匹配不需要转换单位的文件
    }
  }
}
