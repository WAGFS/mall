module.exports = {
  configureWebpack: { //配置webpack属性
    resolve: {
      alias: {
        // 给路径起别名，vue默认配置里配置了一个----> "@":'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views':'@/views'
      }
    }
  }
}
