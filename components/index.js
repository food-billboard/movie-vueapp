export default {
  install(Vue) {
    const components = require.context('~/components/common', false, /\.vue$/)
    // components.keys() 获取文件名数组
    components.keys().forEach(path => {
      // 获取组件文件名
      const fileName = path.replace(/(.*\/)*([^.]+).*/ig, "$2")
      // components(path).default 获取 ES6 规范暴露的内容，components(path) 获取 Common.js 规范暴露的内容
      Vue.component(fileName, components(path).default || components(path))
    })
  } 
}