<template>
  <van-cell-group>
    <van-field 
      v-model="internalTime[0]" 
      clearable 
      label="上映时间(起始)" 
      input-align="center" 
      placeholder="请输入开始时间" 
      readonly
      @focus="timeStartFocus" 
    />
    <van-field 
      v-model="internalTime[1]" 
      clearable 
      label="上映时间(结束)" 
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
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="startDateConfirm"
      />
    </van-popup>
    <!-- 结束时间控件 -->
    <van-popup v-model="timeEndShow" position="bottom">
      <van-datetime-picker
        v-model="internalTime[1]"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="endDateConfirm"
      />
    </van-popup>
  </van-cell-group>
</template>
<script>
export default {
  data() {
    return {
      timeStartShow: false,
      timeEndShow: false,
      minDate: null,
      maxDate: null,
      internalTime: []
    }
  },
  watch: {
    internalTime() {
      this.$emit("change", this.internalTime)
    }
  },
  methods: {
    timeStartFocus() {
      this.timeStartShow = true 
    },
    timeEndFocus() {
      this.timeEndShow = true 
    },
    // 日期格式
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    startDateConfirm() {

    },
    endDateConfirm() {

    }
  }
}
</script>