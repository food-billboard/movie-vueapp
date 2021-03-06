import COLOR_MAP from "./color.map"

const FULL_COLOR_LIST = [
  COLOR_MAP.DAY,
  COLOR_MAP.NIGHT
].reduce((acc, cur) => {
  const list = Object.keys(cur)
  acc.push(...list)
  return acc 
}, [] as any)

export const COLOR_LIST = FULL_COLOR_LIST.slice(0, FULL_COLOR_LIST.length / 2)

type TColorStorage = {
  color: string 
  mode: "0" | "1" | "2"
}

export function defaultColor() {
  return COLOR_LIST[0]
}

export const APP_COLOR_KEY = 'APP_COLOR_KEY'

class ColorManger {

  constructor(context: any) {
    this.init(context)
  }

  #state = {
    currentColor: defaultColor(),
    mode: "0",
  }

  getStorage(context: any, key: string) {
    const result = context.$store.state.localStorage || {}
    return result[key]
  }

  setStorage(context: any, value: Partial<TColorStorage>) {
    context.$store.commit("localStorage/changeColor", value)
  }

  init(context: any) {
    const color = this.getStorage(context, APP_COLOR_KEY)
    if(color) {
      this.#state.currentColor = color.color 
      this.#state.mode = color.mode 
    }
  }

  changeColor(context: any, color: string) {
    this.#state.currentColor = color 
    this.setStorage(context, {
      color
    })
  }

  changeColorMode(context: any, mode: "0" | "1") {
    this.#state.mode = mode 
    this.setStorage(context, {
      mode
    })
  }

  get currentColor() {
    return this.#state.currentColor
  }

  get currentMode() {
    return this.#state.mode
  }

  get COLOR_LIST() {
    return COLOR_LIST
  }

  get defaultColor() {
    return defaultColor()
  }

  isNight() {
    const hour = new Date().getHours()
    return hour >= 20 || hour < 9
  }

  isClose() {
    return this.currentMode === "2"
  }

  isModeAndNight() {
    return this.currentMode === "0" && this.isNight()
  }

  currentModeColor(color: string) {
    if(this.isClose()) return ""
    if(!this.isModeAndNight()) return color
    const index = FULL_COLOR_LIST.indexOf(color)
    return FULL_COLOR_LIST[FULL_COLOR_LIST.length / 2 + index]
  }

  generateStyleColor(color: string, level: string) {
    if(this.isClose()) return "transparent"
    const currentColor = this.currentModeColor(color)
    const modeMap = this.isModeAndNight() ?  "NIGHT" : "DAY"
    const colorMap = COLOR_MAP[modeMap]
    const colorTypeMap = colorMap[currentColor as keyof typeof colorMap] 
    return colorTypeMap[level as keyof typeof colorTypeMap]
  }

}

let instance: any 

function generateColorManager(context: any) {
  if(instance) return instance
  instance = new ColorManger(context)
  return instance
}

export default generateColorManager