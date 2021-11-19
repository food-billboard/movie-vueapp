<template>
  <div>
    <div class="daily-title">
      每日上新
    </div>
    <div v-swiper:swiperDaily="swiperDailyConfig" class="swiper daily-swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item) in value"
          :key="item._id"
          class="home-daily-item swiper-slide"
          @click="handleClick(item)"
        >
          <card-item
            :value="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CardItem from './cardItem.vue'
  export default {
    components: {
      CardItem
    },
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        swiperDailyConfig: {
          slidesPerView: 4,
          spaceBetween: 10,
          slidesPerGroup: 4,
          loopFillGroupWithBlank: true,
        },
      }
    },
    methods: {
      handleClick(target) {
        const { _id } = target
        this.$router.push({
          path: "/detail",
          query: {
            id: _id 
          }
        }) 
      }
    }
  }
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
.daily-title {
  &:extend(.normal-title);
}
.daily-swiper {
  height: 25vw;
  background-color: @normal-background;
}
</style>