<template>
  <div>
    <search 
      @focus="handleSearch"
    />
    <van-notice-bar 
      :text="notice"
      left-icon="volume-o"
    />
    <custom-swiper 
      :value="swiperList"
      @action="handleClickSwiper"
    />
    <classify-list 
      :value="classify"
    />
    <daily
      style="margin-top: 16px"
      :value="daily"
    />
  </div>
</template>
<script>
import ClassifyList from './components/classify'
import Daily from './components/daily'
import CustomSwiper from '@/components/Swiper'
import Search from '@/components/Search'
export default {
  components: {
    CustomSwiper,
    Search,
    ClassifyList,
    Daily
  },
  async asyncData({ app }) {
    const swiperData = await app.$API_USER.getSwiper()
    const noticeData = await app.$API_USER.getNotice()
    const classify = await app.$API_USER.getClassifyIconList({ count: 16 })
    const daily = await app.$API_USER.getDaily({ count: 16 })

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
      }),
      notice: noticeData?.notice || "",
      classify,
      daily
    }
  },
  data() {
    return {
      swiperList: [],
      notice: "",
      classify: [],
      daily: []
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