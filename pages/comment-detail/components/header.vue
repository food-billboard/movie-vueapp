<template>
  <comment-item
    :footer="false" 
    :comment-self="false"
    :comment-detail="false" 
    :class="['background-color', realColorClass, 'secondary']"
    :value="value"
  />
</template>
<script>
import CommentItem from '@/components/CommentItem'
import LayoutMixins from '@/mixins/layout'
export default {
  components: {
    CommentItem
  },
  mixins: [
    LayoutMixins
  ],
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
  @import url("/assets/global.less");
</style>