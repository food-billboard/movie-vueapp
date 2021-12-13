<template>
  <van-sticky>
    <div 
      class="classify-list"
    >
      <div
        :style="{
          width: containerWidth
        }"
      >
        <div
          v-for="(item) in formatValue"
          :key="item._id"
          :class="[
            'classify-item',
            'color',
            realColorClass,
            {
              'classify-item-active primary': active === item._id && item._id !== '__prefix__'
            },
            {
              'secondary': active !== item._id && item._id !== '__prefix__'
            },
            {
              'classify-item-ellipsis disabled': item._id === '__prefix__'
            }
          ]"
          @click="handleGetDetail(item)"
        >
          {{item.name}}
        </div>
      </div>
    </div>
  </van-sticky>
</template>
<script>
import LayoutMixins from '@/mixins/layout'
export default {
  mixins: [
    LayoutMixins
  ],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ellipsis: false 
    }
  },
  computed: {
    formatValue() {
      if(this.value.length === 10) return this.value 
      return !this.ellipsis ? [...this.value.slice(0, 9), {
         name: "展开",
          _id: "__prefix__"
      }]: [
        ...this.value,
        {
          name: "收起",
          _id: "__prefix__"
        }
      ] 
    },
    containerWidth() {
      return this.ellipsis ? "100vw" : (this.formatValue.length * 20 + "vw")
    }
  },
  methods: {
    handleGetDetail(target) {
      const { _id } = target
      if(_id === "__prefix__") {
        this.ellipsis = !this.ellipsis
      }else {
        this.$emit("action", target)
      }
    },
  },
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .classify-list {
    width: 100vw;
    overflow-y: hidden;
    overflow-x: auto;
  }
  .classify-item {
    width: 20vw;
    display: inline-block;
    line-height: 2;
    text-align: center;
    font-size: @title-font-size;
  }
  .classify-item-active {
    border-bottom: 3px solid;
  }
</style>