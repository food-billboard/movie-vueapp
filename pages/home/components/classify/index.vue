<template>
  <van-grid
    :clickable="true"
  >
    <van-grid-item 
      v-for="(item) in value"  
      :key="item._id" 
      :text="item.name"
      :icon="item.icon"
      :to="`/classify?id=${item._id}`"
    />
  </van-grid>
</template>
<script lang="ts">
  export default {
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>