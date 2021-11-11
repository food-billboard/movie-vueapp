<template>
  <van-search 
    v-model="value" 
    placeholder="请输入搜索关键词" 
    show-action
    shape="round"
    @search="handleSearch"
    @focus="handleFocus"
  />
</template>
<script>
import { noop } from 'lodash'
export default {
  props: {
    onSearch: {
      type: Function,
      default() {
        return noop 
      }
    }
  },
  data() {
    return {
      value: ""
    }
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.value)
    },
    handleFocus() {
      this.$emit("focus")
    }
  }
}
</script>