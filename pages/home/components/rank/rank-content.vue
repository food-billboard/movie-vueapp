<template>
  <div>
    <div
      v-if="!!value.match.length"
      v-swiper:swiperRank="swiperRankConfig"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <div
          v-for="item in value.match"
          :key="item._id || item[0]._id"
          class="rank-item swiper-slide"
        >
          <div v-if="item._id" class="rank-item-sub-wrapper">
            <rank-sub-item :value="item" />
          </div>
          <div v-else class="rank-item-sub-wrapper">
            <rank-sub-item
              v-for="matchItem in item"
              :key="matchItem._id"
              :value="matchItem"
              class="rank-item-sub-wrapper-content"
            />
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无数据"></van-empty>
  </div>
</template>
<script>
import RankSubItem from './rankSubItem.vue'
export default {
  components: {
    RankSubItem,
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          match: []
        }
      }
    }
  },
  data() {
    return {
      swiperRankConfig: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
    }
  },
}
</script>
<style lang="less" scoped>
@import url('/assets/global.less');
.rank-item {
  &.swiper-slide {
    width: 300px;
    height: 300px;
  }
  &-sub-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    &-content {
      width: 48%;
      height: 48%;
      margin-top: 1%;
    }
  }
}
</style>