<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="immediateCheck"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { withTry } from '@/utils'
export default {
  props: {
    currPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    fetchData: {
      type: Function,
      default() {
        return function() {}
      }
    },
    resumeData: {
      type: Function,
      default() {
        return function() {}
      }
    },
    immediateCheck: {
      type: Boolean,
      default: true  
    }
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      internalCurrPage: this.currPage ?? 0
    }
  },
  methods: {
    async onRefresh(params={}) {
      this.resumeData?.()
      this.internalCurrPage = 0 
      await this.internalFetchData(true, params)
      this.refreshing = false 
    },
    async onLoad() {
      if(this.refreshing) return 
      await this.internalFetchData()
    },
    async internalFetchData(init=false, params={}) {
      const [ err, value ] = await withTry(this.fetchData)({
        currPage: this.internalCurrPage,
        pageSize: this.pageSize,
        init,
        ...params
      })
      this.error = !!err
      if(this.error) this.loading = false 
      this.finished = !this.error && !!value && (!value.length || value.length < this.pageSize)
      this.internalCurrPage += 1
    }
  }
}
</script>