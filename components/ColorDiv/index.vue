<template>
  <div :class="[ 'color', type, realColorClass ]" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  props: {
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