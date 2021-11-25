<template>
  <div class="color-setting">
    <div :class="['internal', color, 'primary']">1111</div>
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
import layoutMixin from '@/mixins/layout'
export default {
  mixins: [
    layoutMixin
  ],
  data() {
    return {
      colorSet: "0",
      currentColor: defaultColor(),
    }
  },
  computed: {
    colorList() {
      return COLOR_LIST
    },
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
  .color-setting {
    margin-top: @normal-margin * 2;
  }
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