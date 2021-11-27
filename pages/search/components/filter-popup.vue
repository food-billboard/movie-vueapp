<template>
  <div
    :class="['search-filter-content', 'bgColor', 'background-color', realColorClass]"
  >
    <van-form 
      @submit="onSubmit"
    >
      <van-field name="classify" label="分类">
        <template #input>
          <van-checkbox-group v-model="classify" direction="horizontal">
            <van-checkbox 
              v-for="(item) in classifyList"
              :key="item._id"
              :name="item._id" 
              shape="square"
            >
              {{item.name}}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <time-range-picker
        @change="handleTimeChange"
      />
      <div class="search-filter-content-submit">
        <van-button native-type="button" class="search-filter-content-submit-button" type="default" @click="onReset">重置</van-button>
        <loading-button class="search-filter-content-submit-button" block type="info" native-type="submit">提交</loading-button>
      </div>
    </van-form>
    <van-overlay :show="loading" style="background-color: rgba(0, 0, 0, 0.1)">
      <loading-overlay loading />
    </van-overlay>
  </div>
</template>
<script>
import TimeRangePicker from './time-range-picker.vue'
import Loading from '@/components/Loading'
import LoadingButton from '@/components/LoadingButton'
import layoutMixins from '@/mixins/layout'
import { withTry } from '@/utils'
export default {
  components: {
    LoadingOverlay: Loading,
    LoadingButton,
    TimeRangePicker
  },
  mixins: [
    layoutMixins,
  ],
  data() {
    return {
      classify: [],
      time: [],
      loading: true,
      classifyList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.$emit("search", {
        classify: this.classify,
        time: this.time.join("_")
      })
    },
    async fetchData() {
      this.loading = true 
      const [, value] = await withTry(this.$API_USER.getClassifyNameList)({ count: 16 })
      if(value) this.classifyList = value 
      this.loading = false 
    },
    onReset() {
      this.classify = []
      this.time = []
    },
    handleTimeChange(value) {
      this.time = value 
    }
  }
}
</script>
<style lang="less" scoped>
  .search-filter-content {
    height: 100vh;
    width: 80vw;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    &-submit {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      &-button {
        width: 50%;
      }
    }
  }
</style>