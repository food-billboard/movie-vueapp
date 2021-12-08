<template>
  <!-- <van-overlay :show="visible" :lock-scroll="false" >
    <van-index-bar>
      <van-index-anchor
        v-for="(item) in value"
        :key="item.key"
        :index="item.key"
      >
        <span>{{item.key}}</span>
        <van-cell v-for="(data) in item" :key="data._id" :title="data.name" @click="handleSelect(item)" />
      </van-index-anchor>
    </van-index-bar>
  </van-overlay> -->
  <van-index-bar>
      <van-index-anchor
        v-for="(item) in value"
        :key="item.key"
        :index="item.key"
      >
        <span>{{item.key}}</span>
        <van-cell v-for="(data) in item" :key="data._id" :title="data.name" @click="handleSelect(item)" />
      </van-index-anchor>
    </van-index-bar>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false 
    },
    dataType: {
      type: String,
      default: "classify"
    }
  },
  data() {
    return {
      value: [],
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
        console.log(22222222)
        this.this.fetchData()
      }
    }
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
        this.value = targetCache.value 
      }else {
        const result = await this.requestMethod({ count: 99999 })
        const formResult = this.formatValue(result) 
        this.value = formResult
        this.$store.commit("localStorage/cacheIndexData", {
          key: this.dataType,
          value: formResult
        })
      }
      console.log(this.value, 233333)
    },
    handleSelect() {
      
    },

  },
}
</script>