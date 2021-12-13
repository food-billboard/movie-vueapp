<template>
  <div class="error-page">
    <div class="error">
      <div class="where-is-panfish">
        <img class="elem bg" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/bg.1f516b3.png~tplv-t2oaga2asx-image.image">
        <!-- <img class="elem panfish" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-assets/v3/static/img/panfish.9be67f5.png~tplv-t2oaga2asx-image.image"> -->
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
  head () {
    return {
      title: `${this.statusCode === 404 ? '找不到页面' : '呈现页面出错'}`,
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
<style lang="less" scoped>
  @import url("/assets/global.less");
  .error-page {
    height: 100vh;
  }
  .where-is-panfish {
    display: flex;
    flex-direction: column;
  }
  .title,
  .error-link {
    line-height: 2;
    font-size: @title-font-size;
    text-align: center;
    display: block;
  }
</style>
