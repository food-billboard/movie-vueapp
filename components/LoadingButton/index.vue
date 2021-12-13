<template>
  <van-button
    :loading="loading"
    :type="type"
    :size="size"
    :text="text"
    :icon="icon"
    :color="color"
    :plain="plain"
    :square="square"
    :round="round"
    :disabled="disabled"
    :loading-size="loadingSize"
    :block="block"
    :native-type="nativeType"
    @click="handleClick"
  >
    <slot></slot>
  </van-button>
</template>
<script>
import { withTry } from '@/utils'
export default {
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal",

    },
    action: {
      type: Function,
      default() {
        return function() {}
      }
    },
    text: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loadingSize: {
      type: String,
      default: "20px",
    },
    nativeType: {
      type: String,
      default: undefined,
    }
  },
  data() {
    return {
      loading: false 
    }
  },
  methods: {
    async handleClick(e) {
      if(this.loading) return 
      this.loading = true 
      if(this.action) await withTry(this.action)(e)
      this.loading = false 
    }
  }
}
</script>