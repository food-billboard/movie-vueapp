<template>
  <div class="container">
    hello world 
  </div>
</template>
<script>
export default {
  layout: "default",
  // validate  =>  asyncData  =>  fetch  =>  head
  // async asyncData({ app, store, params, redirect, error }) {
  //   // 一般在 asyncData 会对主要页面数据进行预先请求
  //   // asyncData 只在首屏被执行，其它时候相当于 created 或 mounted 在客户端渲染页面。
  //   console.log(app, store, params)
  //   // 返回内容会被保存data
  //   return {
  //     list: [22]
  //   }
  // },
  // fetch() {
  //   // fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。
  //   // let { data } = await axios.get('http://my-api/stars')
  //   // store.commit('setStars', data)
  // },
  // validate() {
  //   // Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。
  //   console.log(this)
  //   // 生命周期可以返回一个 Boolean，为真则进入路由，为假则停止渲染当前页面并显示错误页面 || Promise
  // },
  // watchQuery() {
  //   //监听参数字符串更改并在更改时执行组件方法 (asyncData, fetch, validate, layout, ...)
  // },
  // head() {
  //   // Nuxt.js 使用了 vue-meta 更新应用的 头部标签(Head) 和 html 属性。
  // },
  // data() {
  //   return {
  //     list: [],
  //   }
  // },
  // async mounted() {
  //   console.log(this.$axios)
  // }
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
