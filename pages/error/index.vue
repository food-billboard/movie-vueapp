<template>
  <div class="error-page">
    <div class="error">
      <div class="where-is-panfish">
        <img class="elem bg" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/bg.1f516b3.png~tplv-t2oaga2asx-image.image">
        <img class="elem panfish" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/panfish.9be67f5.png~tplv-t2oaga2asx-image.image">
        <img class="elem sea" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/sea.892cf5d.png~tplv-t2oaga2asx-image.image">
        <img class="elem spray" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/spray.bc638d2.png~tplv-t2oaga2asx-image.image">
      </div>
      <div class="title">{{statusCode}} - {{ message }}</div>
      <nuxt-link class="error-link" to="/">回到首页</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  asyncData() {
    // const tagInfo = await app.$api.getTagDetail({
    //   tagName: encodeURIComponent(query.name)
    // }).then(res => {
    //   if (res.s === 1) {
    //     return res.d
    //   } else {
    //     // 这样我们在 error 对象中又多了 query 属性
    //     error({
    //       statusCode: 404,
    //       message: '标签不存在',
    //       query 
    //     })
    //     return
    //   }
    // })
    // return {
    //   tagInfo
    // }
    return {}
  },
  head () {
    return {
      title: `${this.statusCode === 404 ? '找不到页面' : '呈现页面出错'}`,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || 'Error'
    }
  },
}
</script>
