<template>
  <div class="detail-poster">
    <div class="detail-poster-title">
      <color-icon  
        :name="iconName"
        @click="handleChangeMode"
      />
    </div>
    <div
      v-show="iconType === 'list'"
      class="detail-poster-list"
    >
      <van-image
        v-for="item in value"
        :key="item"
        width="100%"
        height="5rem"
        lazy-load
        class="detail-poster-list-item"
        :src="item"
        @click="handleClick"
      />
    </div>
    <div 
      v-show="iconType === 'swiper'"
      v-swiper:swiperPoster="swiperOption" 
      class="swiper-poster swiper"
    >
      <div class="swiper-wrapper">
        <div v-for="(item) in value" :key="item" class="swiper-slide">
          <img :src="item" class="swiper-image-content" @click="handleClick" />
        </div>
      </div>
    </div>
    <van-image-preview
      v-model="previewShow"
      :images="value"
    />
  </div>
</template>
<script>
export default {
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
      iconType: "list",
      swiperOption: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        autoplay: true
      },
      previewShow: false 
    }
  },
  computed: {
    iconName() {
      return this.iconType === "list" ? "photo-o" : "tv-o"
    }
  },
  methods: {
    handleChangeMode() {
      this.iconType = this.iconType === "list" ? "swiper" : "list"
    },
    handleClick() {
      this.previewShow = true 
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .detail-poster {
    width: 100%;
    padding: 0 @normal-padding;
    box-sizing: border-box;
    &-title {
      text-align: right;
      margin-bottom: @normal-margin;
    }
    &-list {
      width: 100%;
      &-item {
        margin-bottom: @normal-margin;
      }
    }
    .swiper-poster {
      .swiper-slide {
        background-size: cover;
        background-position: center;
        .swiper-image-content {
          width: 100%;
          height: 5rem;
        }
      }
    }
  }
</style>