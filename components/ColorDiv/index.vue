<template>
  <div :class="[ 'color', type, realColorClass ]" >
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
  }
}
</script>