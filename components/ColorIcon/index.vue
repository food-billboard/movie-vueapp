<template>
  <van-icon :name="name" :class="[ 'color', 'primary', realColorClass ]" />
</template>
<script>
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  props: {
    name: String
  }
}
</script>