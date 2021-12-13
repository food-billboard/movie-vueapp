<template>
  <div>
    <div class="rank-title" @click="handleClick">排行榜</div>
    <rank-item 
      v-for="(item) in formatValue"
      :key="item._id"
      :value="item"
    />
  </div>
</template>
<script>
import RankItem from './rankItem.vue'
import { formatRankValueList }from './utils'
export default {
  components: {
    RankItem
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    formatValue() {
      return this.value.map(item => {
        const { match } = item 
        const newMatch = formatRankValueList(match)
        return {
          ...item,
          match: newMatch,
        } 
      })
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/rank"
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .rank-title {
    &:extend(.normal-title);
  }
</style>