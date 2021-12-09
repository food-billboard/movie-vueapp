<template>
  <van-overlay :show="visible" :lock-scroll="false">
    <van-nav-bar
      title="索引选择"
      left-text="关闭"
      @click-left="handleClose"
    />
    <van-index-bar style="background-color: white">
      <van-index-anchor
        v-for="(item) in dataSource"
        :key="item.key"
        :index="item.key"
      >
        <span>{{item.key}}</span>
        <van-cell v-for="(data) in item" :key="data._id" :title="data.name" >
          <template #extra>
            <van-checkbox :value="value.includes(data._id)" @change="handleSelect(item)" />
          </template>
        </van-cell>
      </van-index-anchor>
    </van-index-bar>
  </van-overlay>
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
      // console.log(this.dataSource, 233333)
    },
    syncSelectValue() {
      this.selected = this.value.map(item => {
        return this.dataSource.find(data => data._id === item)
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
      this.$emit("change", newValue)
      this.$emit("sourceChange", newSelect)
    },
    handleClose() {
      this.$emit("close")
    }
  },
}
</script>