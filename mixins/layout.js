import ColorManger, { defaultColor } from '@/utils/color'

export default {
  data() {
    const defaultColorTheme = defaultColor()
    return {
      currentColorTheme: defaultColorTheme,
      currentMode: "0",
      realColorClass: this.realColorClassSet(defaultColorTheme),
    }
  },
  mounted() {
    this.currentColorTheme = ColorManger(this).currentColor
    this.currentMode = ColorManger(this).currentMode
    this.realColorClass = this.realColorClassSet(this.currentColorTheme)
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
      this.currentColorTheme = state.color 
      this.currentMode = state.mode 
      this.realColorClass = this.realColorClassSet(state.color)
    },
    realColorClassSet(color) {
      const realColor = ColorManger(this).currentModeColor(color)
      return `f${realColor.slice(1)}`
    },
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
      return `color ${this.realColorClass}`
    },
    generateStyleColor() {
      const that = this 
      return function(level) {
        return ColorManger(that).generateStyleColor(this.currentColorTheme, level)
      }
    },
  }
}