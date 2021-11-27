<template>
  <rank-list
    :value="matchValue"
  ></rank-list>
</template>
<script>
import RankList from '../../home/components/rank/rank-content.vue'
import { formatRankValueList } from '../../home/components/rank/utils'
export default {
  components: {
    RankList
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
    matchValue() {
      return {
        match: formatRankValueList(this.value.slice(0, 16)) 
      }
    }
  }
}
</script>