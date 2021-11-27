<template>
  <div>
    <div 
      class="rank-item-title normal-title"
    >
      <nuxt-link
        :to="`/rank?id=${value._id}`"
      >
        {{value.name}}
      </nuxt-link>
    </div>
    <rank-content 
      :value="value"
    />
  </div>
</template>
<script lang="ts">
import RankContent from './rank-content.vue'
export default {
  components: {
    RankContent
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>
<style lang="less" scoped>
@import url('/assets/global.less');
  .rank-item-title {
    opacity: 0.5;
  }
</style>