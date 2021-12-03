import Vue from 'vue'

Vue.use({
  install(Vue) {
    Vue.prototype.$number = function number(number) {
      const numberData = Number(number)
      const positiveNumber = numberData > 0 ? numberData : numberData * -1 
      if(Number.isNaN(numberData)) return number 
      if(positiveNumber < 10000) return numberData
      if(positiveNumber < 10000 * 10000) return numberData / 10000 + "万"  
      return numberData
    } 
  }
})