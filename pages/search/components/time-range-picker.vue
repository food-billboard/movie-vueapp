<template>
  <van-cell-group>
    <van-field 
      v-model="internalFormatTime[0]" 
      clearable 
      label="上映时间-始" 
      input-align="center" 
      placeholder="请输入开始时间" 
      readonly
      @focus="timeStartFocus" 
    />
    <van-field 
      v-model="internalFormatTime[1]" 
      clearable 
      label="上映时间-末" 
      input-align="center" 
      placeholder="请输入结束时间" 
      readonly
      @focus="timeEndFocus" 
    />
    <!-- 开始时间控件 -->
    <van-popup v-model="timeStartShow" position="bottom">
      <van-datetime-picker
        v-model="internalTime[0]"
        type="date"
        :min-date="internalMinDate"
        :max-date="internalMaxDate"
        :formatter="internalFormatter"
        @confirm="startDateConfirm"
        @cancel="startDateConfirm"
      />
    </van-popup>
    <!-- 结束时间控件 -->
    <van-popup v-model="timeEndShow" position="bottom">
      <van-datetime-picker
        v-model="internalTime[1]"
        type="date"
        :min-date="internalMinDate"
        :max-date="internalMaxDate"
        :formatter="internalFormatter"
        @confirm="endDateConfirm"
        @cancel="endDateConfirm"
      />
    </van-popup>
  </van-cell-group>
</template>
<script>
export default {
  props: {
    minDate: {
      type: Date,
      default() {
        return undefined
      } 
    },
    maxDate: {
      type: Date,
      default() {
        return undefined
      }
    },
  },
  data() {
    return {
      timeStartShow: false,
      timeEndShow: false,
      internalMinDate: undefined,
      internalMaxDate: undefined,
      internalTime: [],
      internalFormatTime: []
    }
  },
  watch: {
    internalTime() {
      this.updateFormatterTime()
    },
    internalFormatTime() {
      this.$emit("change", this.internalFormatTime)
    }
  },
  created() {
    this.getMaxDate()
  },
  methods: {
    // 最大最小时间处理
    getMaxDate() {
      this.internalMinDate = new Date(1888, 0, 1)
      this.internalMaxDate = new Date()
    },
    reset() {
      this.internalTime = [] 
    },
    timeStartFocus() {
      this.timeStartShow = true 
    },
    timeEndFocus() {
      this.timeEndShow = true 
    },
    updateFormatterTime() {
      const [ start, end ] = this.internalTime
      this.internalFormatTime = [
        this.internalFormatDate(start),
        this.internalFormatDate(end)
      ]
    },
    updateRange() {
      const [ start, end ] = this.internalTime
      if(start) this.internalMinDate = start 
      if(end) this.internalMaxDate = end 
    },
    startDateConfirm() {
      this.timeStartShow = false 
    },
    endDateConfirm() {
      this.timeEndShow = false 
    },
    internalFormatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } 
      return value;
    },
    internalFormatDate(date) {
      if(!date) return ""
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }
  }
}
</script>