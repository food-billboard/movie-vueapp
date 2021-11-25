
export default {
  data() {
    return {
      currentColor: "#a0d911",
      currentMode: "0",
      realColorClass: "fa0d911"
    }
  },
  created() {
    if (process.browser) {
      this.updateData(this.currentColorState)
    }
  },
  watch: {
    currentColorState: {
      deep: true,
      handler(data) {
        this.updateData(data)
      }
    }
  },
  methods: {
    updateData(state) {
      this.currentColor = state.color 
      this.currentMode = state.mode 
      this.realColorClass = this.realColorClassSet(state.color)
    },
    realColorClassSet(color) {
      return `f${color.slice(1)}`
    },
    // border() {
    //   return `border-color ${this.realColorClass}`
    // },
    // background() {
    //   return `background-color ${this.realColorClass}`
    // },
    // color() {
    //   return `color ${this.realColorClass}`
    // },
  },
  computed: {
    currentColorState() {
      return this.$store.state.localStorage.APP_COLOR_KEY 
    },
    border() {
      return `border-color ${this.realColorClass}`
    },
    background() {
      return `background-color ${this.realColorClass}`
    },
    color() {
      console.log(this.realColorClass, 22233)
      return `color ${this.realColorClass}`
    },
    boxShadow() {
      // return function() {
      //   arguments.forEach(arg => {

      //   })
      // }
    },
    textShadow() {

    }
  }
}