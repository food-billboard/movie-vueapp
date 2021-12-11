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
      style="margin: 16px 0"
      :value="daily"
    />
    <rank
      :value="rank"
    />
  </div>
</template>
<script>
import ClassifyList from './components/classify'
import Daily from './components/daily'
import Rank from './components/rank'
import CustomSwiper from '@/components/Swiper'
import Search from '@/components/Search'
export default {
  components: {
    CustomSwiper,
    Search,
    ClassifyList,
    Daily,
    Rank
  },
  layout: "homeLayout",
  async asyncData({ app }) {
    const swiperData = await app.$API_USER.getSwiper()
    const noticeData = await app.$API_USER.getNotice()
    const classify = await app.$API_USER.getClassifyIconList({ count: 16 })
    const daily = await app.$API_USER.getDaily({ count: 16 })
    const rank = await app.$API_USER.getHomeRankList({ count: 16 })

    // 返回内容会被保存data
    return {
      swiperList: swiperData.map(item => {
        return {
          ...item,
          src: item.poster,
          id: item._id
        }
      }),
      notice: noticeData?.notice || "",
      classify,
      daily,
      rank
    }
  },
  data() {
    return {
      swiperList: [],
      notice: "",
      classify: [],
      daily: [],
      rank: []
    }
  },
  methods: {
    handleClickSwiper(target) {
      const { type, id } = target
      const path = type === "special" ? "/special" : "/detail" 
      this.$router.push({
        path,
        query: {
          id
        }
      })
    },
    handleSearch() {
      this.$router.push({
        path: "/search"
      })
    }
  }
}
</script>