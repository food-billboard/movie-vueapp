
<template>
  <div class="custom-swipper-wrapper">
    <div ref="swiperTop" v-swiper:swiperTop="swiperOptionTop" class="swiper gallery-top">
      <div class="swiper-wrapper">
        <div v-for="(item) in value" :key="item.id" class="swiper-slide">
          <img :src="item.src" class="swiper-image-content" @click="handleClick(item)" />
        </div>
      </div>
    </div>
    <div ref="swiperThumbs" v-swiper:swiperThumbs="swiperOptionThumbs" class="swiper gallery-thumbs">
      <div class="swiper-wrapper">
        <div v-for="(item) in value" :key="item.id" class="swiper-slide">
          <img :src="item.src" class="swiper-image-content" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { noop } from 'lodash'
  export default {
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      onAction: {
        type: Function,
        default() {
          return noop 
        }
      }
    },
    data() {
      return {
        swiperOptionTop: {
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 5,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.swiperTop.controller.control = this.swiperThumbs
        this.swiperThumbs.controller.control = this.swiperTop
      })
    },
    methods: {
      handleClick(target) {
        this.$emit("action", target)
      }
    }
  }
</script>

<style lang="less" scoped>
  .custom-swipper-wrapper {
    height: 320px;
    background-color: black;
  }
  .swiper {
    .swiper-slide {
      background-size: cover;
      background-position: center;
      .swiper-image-content {
        width: 100%;
        height: 100%;
      }
    }
    &.gallery-top {
      height: 80%;
      width: 100%;
    }
    &.gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
    }
    &.gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    &.gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }
</style>