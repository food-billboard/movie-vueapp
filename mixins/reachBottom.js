export default {
  data() {
    return {
      _scrollingElement: null,
      _isReachBottom: false,  // 防止进入执行区域时 重复触发
      reachBottomDistance: 80 // 距离底部多远触发
    }
  },
  mounted() {
    this._scrollingElement = document.scrollingElement
    window.addEventListener('scroll', this._windowScrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this._windowScrollHandler)
  },
  methods: {
    _windowScrollHandler() {
      const scrollHeight = this._scrollingElement.scrollHeight
      const currentHeight = this._scrollingElement.scrollTop + this._scrollingElement.clientHeight + this.reachBottomDistance
      if (currentHeight < scrollHeight && this._isReachBottom) {
        this._isReachBottom = false
      }
      if (this._isReachBottom) {
        return
      }
      // 触底事件触发
      if (currentHeight >= scrollHeight) {
        this._isReachBottom = true
        typeof this.reachBottom === 'function' && this.reachBottom()
      }
    }
  },
}
