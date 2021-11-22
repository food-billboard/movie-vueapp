<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
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
    async onRefresh() {
      this.resumeData?.()
      this.internalCurrPage = 0 
      await this.internalFetchData(true)
      this.refreshing = false 
    },
    async onLoad() {
      if(this.refreshing) return 
      await this.internalFetchData()
    },
    async internalFetchData(init=false) {
      const [ err, value ] = await withTry(this.fetchData)({
        currPage: this.internalCurrPage,
        pageSize: this.pageSize,
        init
      })
      this.error = !!err
      this.finished = !value.length || value.length < this.pageSize
      this.internalCurrPage += 1
    }
  }
}
</script>