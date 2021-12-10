<template>
  <div class="tag-select">
    <van-field
      :name="name"
      :label="label"
      :rules="[
        {
          validator: indexesValidator,
          message: `请选择${label}`,
        },
      ]"
    >
      <template #input>
        <van-button size="small" type="primary" icon="plus" native-type="button" @click="indexesVisible = true"></van-button>
      </template>
    </van-field>
    <div class="tag-select-content">
      <van-tag
        v-for="item in sourceValue"
        :key="item._id"
        type="primary"
        class="tag-select-content-item"
        closeable
        @close="handleClose(item)"
        >{{ item.name }}</van-tag
      >
      <indexes-select
        ref='indexes-select-ref'
        :visible="indexesVisible"
        :data-type="indexesType"
        :value="value"
        :source-value="sourceValue"
        :multiple="multiple"
        @change="handleValueChange"
        @close="indexesVisible = false"
      />
    </div>
  </div>
</template>
<script>
import IndexesSelect from '@/components/IndexSelect'
export default {
  components: {
    IndexesSelect,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
    indexesType: {
      type: String,
      default: 'classify',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: true 
    }
  },
  data() {
    return {
      indexesVisible: false,
      sourceValue: [],
    }
  },
  methods: {
    handleValueChange(value, sourceValue) {
      this.$emit('change', value)
      this.handleSourceChange(sourceValue)
    },
    handleSourceChange(value) {
      this.sourceValue = value
    },
    indexesValidator() {
      return Array.isArray(this.value) && this.value.length > 0
    },
    handleClose(value) {
      const newValue = this.value.filter(item => item !== value._id)
      const newSourceValue = this.sourceValue.filter(item => item._id !== value._id)
      this.handleSourceChange(newSourceValue)
      this.handleValueChange(newValue)
    }
  },
}
</script>
<style lang="less" scoped>
@import url('/assets/global.less');
.tag-select-content {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 @normal-padding / 2;
  flex-wrap: wrap;
  &-item {
    margin: @normal-padding / 2 0;
  }
}
</style>