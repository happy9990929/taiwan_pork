module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/taiwan_pork/'
    : '/'
  ,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "臺灣豬證明標章商家資料查詢";
        return args;
      })
  }
}
