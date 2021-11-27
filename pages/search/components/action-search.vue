<template>
  <van-row>
    <van-col span="8">
      <div class="filter-text" @click="showOrderPicker = true">{{order.name}}</div>
    </van-col>
    <van-col span="8">
      <div class="filter-text">
        <color-icon :name="iconType" @click="handleChangeType"></color-icon>
      </div>
    </van-col>
    <van-col span="8">
      <div class="filter-text" @click="showFilterPicker = true">筛选</div>
    </van-col>
    <van-popup v-model="showOrderPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="orderColumns"
        @cancel="showOrderPicker = false"
        @confirm="handleChangeOrderType"
      />
    </van-popup>
    <van-popup 
      v-model="showFilterPicker" 
      position="right"
    >
      <filter-popup
        @search="handleChangeFilter"
      />
    </van-popup>
  </van-row>
</template>
<script>
import FilterPopup from './filter-popup.vue'
export default {
  components: {
    FilterPopup
  },
  props: {
    orderList: {
      type: Array,
      default() {
        return []
      }
    },
    listMode: {
      type: String,
      default: "list",
    }
  },
  data() {
    return {
      order: {
        name: "综合",
        _id: ""
      },
      showOrderPicker: false,
      showFilterPicker: false 
    }
  },
  computed: {
    iconType() {
      return this.listMode === "list" ? "orders-o" : "apps-o"
    },
    orderColumns() {
      return this.orderList.map(item => item.name)
    }
  },
  methods: {
    handleChangeType() {
      const type = this.listMode === "list" ? "card" : "list"
      this.$emit("search", {
        listMode: type 
      })
    },
    handleChangeOrderType(confirm) {
      const target = this.orderList.find(item => item.name === confirm)
      this.showOrderPicker = false 
      if(!target) return 
      this.order = target 
      this.$emit("search", {
        sort: target._id + "=-1"
      })
    },
    handleChangeFilter(target) {
      this.showFilterPicker = false 
      this.$emit("search", target)
    }
  }
}
</script>
<style lang="less" scoped>
  .filter-text {
    text-align: center;
  }
</style>