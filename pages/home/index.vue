<template>
  <div>
    <search 
      @focus="handleSearch"
    />
    <custom-swiper 
      :value="swiperList"
      @action="handleClickSwiper"
    />
  </div>
</template>
<script>
import CustomSwiper from '@/components/Swiper'
import Search from '@/components/Search'
export default {
  components: {
    CustomSwiper,
    Search
  },
  async asyncData({ app }) {
    const swiperData = await app.$API_USER.getSwiper()
    // 返回内容会被保存data
    return {
      swiperList: [
        {
          src: "https://images.pexels.com/photos/9577102/pexels-photo-9577102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: "https://images.pexels.com/photos/9577102/pexels-photo-9577102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
          src: "https://images.pexels.com/photos/10013232/pexels-photo-10013232.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: "https://images.pexels.com/photos/10013232/pexels-photo-10013232.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
      ] || swiperData.map(item => {
        return {
          ...item,
          src: item.poster,
          id: item._id
        }
      })
    }
  },
  data() {
    return {
      swiperList: []
    }
  },
  methods: {
    handleClickSwiper(target) {
      console.log("点击了轮播图", target)
    },
    handleSearch() {
      console.log("跳转去搜索页面")
    }
  }
}
</script>