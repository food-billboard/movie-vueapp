<template>
  <div 
    :class="['movie-card-item', {
      'movie-card-active-item': !value._id.startsWith('__prefix')
    }]"
  >
    <div
      v-if="!value._id.startsWith('__prefix')"
      class="movie-card-item-swipe-wrapper"
    >
      <van-swipe :autoplay="10000" class="movie-card-item-swipe">
        <van-swipe-item v-for="(image, index) in value.images" :key="index">
          <img v-lazy="image" class="swipe-item-img" />
        </van-swipe-item>
      </van-swipe>
      <van-icon :name="storeName" :color="storeColor" class="movie-card-item-store" />
    </div>
    <div 
      v-if="!value._id.startsWith('__prefix')"
      class="movie-card-item-info"
      @click="handleGetDetail"
    >
      <div class="movie-card-item-info-title">{{value.name || "-"}}</div>
      <van-rate v-model="rate" :size="15" readonly />
      <color-div type="secondary" class="movie-card-item-info-sub-title">{{value.public_time}}</color-div>
      <div class="movie-card-item-info-sub-title">
        {{value.hot}}
        <van-icon name="friends-o" />
      </div>
    </div>
  </div>
</template>
<script>
import { withTry } from '@/utils'
import layoutMixins from '@/mixins/layout'
export default {
  mixins: [
    layoutMixins
  ],
  props: {
    value: {
      type: Object,
      default() {
        return {
          name: "",
          images: [],
          rate: 0
        }
      }
    },
    refresh: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  data() {
    return {
      isStore: false 
    }
  },
  computed: {
    rate() {
      return this.value.rate || 0
    },
    storeName() {
      return this.isStore ? "star" : "star-o"
    },
    storeColor() {
      return this.isStore ? this.generateStyleColor("primary") : undefined
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(currentValue, prevValue) {
        if(!this.$isLogin(this) || !currentValue || currentValue._id === prevValue?._id) return 
        this.fetchStore()
      }
    },
  },
  methods: {
    async handleStore() {
      if(!this.$isLogin(this)) {
        this.$dialog.alert({
          title: "提示",
          message: '当前未登录，是否前往登录',
          confirm() {
            this.$client2Login(this)
          }
        })
      }else {
        const method = this.isStore ? this.$API_CUSTOMER.cancelStoreMovie : this.$API_CUSTOMER.storeMovie
        const [err] = await withTry(method)({ _id: this.value._id })
        if(err) {
          this.$toast("出问题了")
        }
        this.refresh()
      }

    },
    async fetchStore() {
      const { _id } = this.value 
      const data = await this.$API_CUSTOMER.getMovieDetail({
        _id
      })
      this.isStore = !!data.store
    },
    handleGetDetail() {
      this.$router.push({
        path: "/detail",
        query: {
          id: this.value._id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .movie-card-item {
    width: 47vw;
    display: inline-block;
    &-swipe-wrapper {
      width: 100%;
      height: 15vh;
      position: relative;
    }
    &-swipe {
      width: 100%;
      height: 100%;
      position: relative;
      .swipe-item-img {
        width: 100%;
        height: 100%;
      }
    }
    &-store {
      position: absolute;
      left: 0;
      top: 0;
    }
    &-info {
      width: 100%;
      padding: @normal-padding / 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      line-height: 1.4;
      &-title {
        font-size: @title-font-size;
        // text-shadow: 0 0 5px @normal-background;
      }
      &-sub-title {
        font-size: @sub-title-font-size;
      }
    }
  }
  // .movie-card-active-item {
  //   box-shadow: 0 0 5px @normal-background;
  // } 
</style>
