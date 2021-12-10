<template>
  <van-popup 
    :value="visible" 
    style="width: 100%"
  >
    <van-sticky>
      <van-nav-bar
        title="索引选择"
        left-text="关闭"
        style="z-index: 2"
        @click-left="handleClose"
      />
    </van-sticky>
    <van-index-bar class="data-index-select" style="height: calc( 100vh - 46px )">
      <div
        v-for="(item) in dataSource"
        :key="item.key"
      >
        <van-index-anchor
          :index="item.key"
        />
        <van-cell v-for="(data) in item.value" :key="data._id" :title="data.name" >
          <template #icon>
            <van-checkbox style="margin-right: 1em" :value="value.includes(data._id)" @click="handleSelect(data)" />
          </template>
        </van-cell>
      </div>
    </van-index-bar>
  </van-popup>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    visible: {
      type: Boolean,
      default: false 
    },
    dataType: {
      type: String,
      default: "classify"
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    sourceValue: {
      type: Array,
      default() {
        
      }
    },
    multiple: {
      type: Boolean,
      default: true 
    }
  },
  data() {
    return {
      dataSource: [],
      selected: [],
      indexes: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
    }
  },
  computed: {
    requestMethod() {
      switch(this.dataType) {
        case "classify": return this.$API_USER.getClassifyIconList
        case "language": return this.$API_USER.getLanguageList
        case "district": return this.$API_USER.getDistrictList
        case "director": return this.$API_USER.getDirectorList
        case "actor": return this.$API_USER.getActorList
      }
      return function() {}
    },
  },
  watch: {
    dataType: {
      handler() {
        if(!this.dataType) return 
        this.this.fetchData()
      }
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    initSyncData() {
      if(this.value.length !== this.selected.length && this.dataSource.length > 0) {
        this.syncSelectValue()
        this.$emit("change", this.value, this.selected)
      }
    },
    formatValue(value) {
      return value.reduce((acc, cur) => {
        const { key } = cur
        const index = this.indexes.indexOf(key)
        if(~index) {
          acc[index].value.push(cur)
        }
        return acc 
      }, this.indexes.map(item => {
        return {
          key: item,
          value: []
        }
      }))
    },
    async fetchData() {
      const targetCache = this.$store.state.localStorage[this.dataType]
      if(targetCache && targetCache.expire > Date.now()) {
        this.dataSource = targetCache.value 
      }else {
        const result = await this.requestMethod({ count: 99999 })
        const formResult = this.formatValue(result) 
        this.dataSource = formResult
        this.$store.commit("localStorage/cacheIndexData", {
          key: this.dataType,
          value: formResult
        })
      }
      this.initSyncData()
    },
    syncSelectValue() {
      this.selected = this.value.map(item => {
        let target  
        this.dataSource.some(data => {
          return data.value.some(subValue => {
            if(subValue._id === item) {
              target = subValue
              return true 
            }
            return false 
          })
        })
        return target
      }).filter(Boolean)
      return this.selected
    },
    handleSelect(value) {
      if(this.selected.length !== this.value.length) {
        this.syncSelectValue()
      }
      let newValue = this.value.filter(item => item !== value._id)
      let newSelect = this.selected.filter(item => item._id !== value._id)
      if(newValue.length === this.value.length) {
        if(this.multiple) {
          newValue.push(value._id)
          newSelect.push(value)
        }else {
          newValue = [value._id]
          newSelect = [value]
        }
      }
      this.selected = newSelect
      this.$emit("change", newValue, newSelect)
    },
    handleClose() {
      this.$emit("close")
    }
  },
}
</script>
<style lang="less" scoped>
  .data-index-select {
    background-color: white;
    overflow: auto;
    width: 100%;
  }
</style>