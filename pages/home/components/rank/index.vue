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
        const [ first, ...nextMatch ] = match
        const rest = nextMatch.length % 4 
        if(rest) nextMatch.push(...new Array(rest).fill(0))
        const newMatch = [
          first,
          ...nextMatch.reduce((acc, cur) => {
            const length = acc.length 
            if(length === 0 || acc[length - 1].length === 4) {
              acc.push([
                cur
              ])
            }else {
              acc[length - 1].push(cur)
            }
            return acc 
          }, [])
        ].filter(item => !!item)
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