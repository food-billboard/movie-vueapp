<template>
  <div class="movie-list-item">
    <div class="movie-list-item-content">
      <van-swipe :autoplay="10000" class="movie-list-item-swipe">
        <van-swipe-item v-for="(image, index) in value.images" :key="index">
          <img v-lazy="image" class="swipe-item-img" />
        </van-swipe-item>
      </van-swipe>
      <div 
        class="movie-list-item-info"
        @click="handleGetDetail"
      >
        <div class="movie-list-item-info-title">{{value.name || "-"}}</div>
        <van-rate v-model="rate" :size="15" readonly />
        <color-div type="secondary" class="movie-list-item-info-sub-title">{{value.public_time}}</color-div>
        <color-div type="secondary" class="movie-list-item-info-sub-title">
          {{value.hot}}
          <color-icon name="friends-o" />
        </color-div>
      </div>
      <div :class="[ 'movie-list-item-action', 'primary', 'border-color', realColorClass ]">
        <div
          class="movie-list-item-action-item"
          @click="handleStore"
        >
          收藏
          <van-icon :name="storeName" :color="storeColor" />
        </div>
      </div>
    </div>
    <div :class="['movie-list-item-description ellipsis', 'background-color', 'disabled']">
      {{value.description || "-"}} 
    </div>
  </div>
</template>
<script>
import LayoutMixin from '@/mixins/layout'
import { withTry } from '@/utils'
export default {
  mixins: [
    LayoutMixin
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
      return this.isStore ? "#ffd21e" : undefined
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
  .movie-list-item {
    width: 100%;
    &-content {
      display: flex;
      height: 15vh;
    }
    &-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: @normal-margin / 2;
      &-title {
        font-size: @title-font-size;
        text-shadow: 0 0 5px @normal-background;
      }
      &-sub-title {
        font-size: @sub-title-font-size;
      }
    }
    &-action {
      border-left: 1px dashed;
      padding: 0 @normal-padding;
      display: flex;
      align-items: center;
      margin: @normal-margin / 2 0;
      &-item {
        font-size: @sub-title-font-size;
      }
    }
    &-swipe {
      height: 100%;
      width: 30vw;
      flex: 1;
      .swipe-item-img {
        width: 100%;
        height: 100%;
      }
    }
    &-description {
      padding: @normal-padding / 4;
      font-size: @sub-title-font-size;
    }
  }
</style>