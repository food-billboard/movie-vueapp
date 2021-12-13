<template>
  <div class="color-setting">
    <van-button type="info" :disabled="checked">222222</van-button>
    <van-button type="primary" :disabled="checked">222222</van-button>
    <van-button type="warning" :disabled="checked">222222</van-button>
    <van-checkbox v-model="checked" shape="square">复选框</van-checkbox>
    <van-radio-group v-model="radio" :disabled="checked">
      <van-radio name="1">单选框 1</van-radio>
      <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
    <van-rate v-model="rate" :disabled="checked" />
    <van-switch v-model="switchData" :disabled="checked" />
    <van-loading />
    <!-- <van-badge :content="5">
      <div class="child" />
    </van-badge> -->
    <van-divider />
    <van-tag type="primary">标签</van-tag>
    <van-tag type="success">标签</van-tag>
    <van-tag type="danger">标签</van-tag>
    <van-tag type="warning">标签</van-tag>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    <!-- <van-slider v-model="slider" :disabled="checked" /> -->

    <div style="margin-bottom: 50px"></div>

    <van-radio-group v-model="colorSet">
      <van-cell-group>
        <van-cell title="开启色调" clickable @click="handleChangeColorSet('0')">
          <template #right-icon>
            <van-radio name="0" />
          </template>
        </van-cell>
        <van-cell title="关闭色调" clickable @click="handleChangeColorSet('1')">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div 
      class="color-list"
    >
      <div
        class="color-list-wrapper"
      >
        <div
          v-for="(item) in colorList"
          :key="item"
          class="color-list-item"
          :style="{borderColor: currentColor === item ? item : 'transparent'}"
          @click="handleSelectDetail(item)"
        >
          <div
            class="color-list-item-content"
            :style="{background: item}"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ColorManger, { COLOR_LIST, defaultColor } from '@/utils/color'
export default {
  data() {
    return {
      colorSet: "0",
      currentColor: defaultColor(),
      checked: true,
      radio: "1",
      rate: 3,
      slider: 50,
      switchData: true,
      active: 1
    }
  },
  computed: {
    colorList() {
      return COLOR_LIST
    }
  },
  created() {
    this.currentColor = ColorManger(this).currentColor
    this.colorSet = ColorManger(this).currentMode
  },
  methods: {
    handleChangeColorSet(colorIndex) {
      this.colorSet = colorIndex
      ColorManger(this).changeColorMode(this, colorIndex)
    },
    handleSelectDetail(color) {
      this.currentColor = color 
      ColorManger(this).changeColor(this, color)
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .color-list {
    width: 100vw;
    overflow-y: hidden;
    overflow-x: auto;
    &-wrapper {
      white-space: nowrap;
    }
    &-item {
      width: 12vw;
      height: 12vw;
      border: 1px solid;
      padding: @normal-padding / 4;
      display: inline-block;
      &-content {
        width: 100%;
        height: 100%;  
      }
    }
  }
</style>