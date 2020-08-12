module.exports = {
	devServer: {
		proxy: {
			'/proxy': {
				target: 'http://mall-pre.springboot.cn',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/proxy': ''
				}
			}
		}
	},
	transpileDependencies: [],
  // publicPath:'/', //根路径
  // outputDir:'/dest',  //打包后输入路径
  // indexPath:'index2.html', //默认页面
  // lintOnSave:true, //eslint 是否开启
  productionSourceMap:false, // sourcemap是否开启


	chainWebpack: config => {
		// config.entry('polyfill').add('@babel/polyfill')
    config.plugins.delete('prefetch')  //删除预加载 做到真正按需加载
  }
}
