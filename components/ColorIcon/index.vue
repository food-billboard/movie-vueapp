<template>
  <van-icon :name="name" :class="[ 'color', type, realColorClass ]" @click="handleClick" />
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  props: {
    name: String,
    type: {
      type: String,
      default: "primary"
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e)
    }
  }
}
</script>