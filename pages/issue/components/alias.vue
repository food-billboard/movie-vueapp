<template>
  <div class="alias-select">
    <van-field
      v-model="inputValue"
      center
      clearable
      label="电影别名"
      placeholder="请输入电影别名"
    >
      <template #button>
        <van-button :disabled="!inputValue" size="small" type="primary" icon="plus" native-type="button" @click="handleAdd"></van-button>
      </template>
    </van-field>
    <div class="alias-select-content">
      <van-tag
        v-for="(item, index) in value"
        :key="index"
        class="alias-select-content-item"
        type="primary"
        size="large"
        closeable
        @close="handleDelete(index)"
      >{{item}}</van-tag>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      inputValue: ""
    }
  },
  methods: {
    handleAdd() {
      if(this.value.includes(this.inputValue)) return this.$toast("存在重复名称")
      this.$emit("change", [ ...this.value, this.inputValue ])
      this.inputValue = ""
    },
    handleDelete(index) {
      const newValue = [...this.value]
      newValue.splice(index, 1)
      this.$emit("change", newValue)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .alias-select-content {
    padding: 0 @normal-padding / 2;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    &-item {
      margin: @normal-margin / 4 0;
    }
  }
</style>