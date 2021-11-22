<template>
  <div class="card-list-wrapper">
    <card-item
      v-for="item in realValue"
      :key="item.id"
      :value="item"
      style="margin-bottom: 2vw"
    />
  </div>
</template>
<script>
import CardItem from './index.vue'
export default {
  components: {
    CardItem
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    baseCount: {
      type: Number,
      default: 2
    }
  },
  computed: {
    realValue() {
      const rest = this.value.length % this.baseCount 
      if(!rest || !this.value.length) return this.value 
      return [
        ...this.value,
        ...new Array(rest).fill(0).map((_, index) => {
          return {
            _id: `__prefix__${index}`
          }
        })
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .card-list-wrapper {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>