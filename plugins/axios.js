// export default function ({ app: { $axios, $cookies } }) {
// 	$axios.defaults.baseURL = process.env.baseUrl
//   $axios.defaults.timeout = 30000
//   $axios.interceptors.request.use(config => {
//     // 头部带上验证信息
//     config.headers['X-Token'] = $cookies.get('token') || ''
//     config.headers['X-Device-Id'] = $cookies.get('clientId') || ''
//     config.headers['X-Uid'] = $cookies.get('userId') || ''
//     return config
//   })
//   $axios.interceptors.response.use(response => {
//     if (/^[4|5]/.test(response.status)) {
//     	return Promise.reject(response.statusText)
//     }
//     return response.data
//   })
// }

// // 如果需要同时在 context ， Vue 实例，甚至 Vuex 中同时注入，可以使用 inject 方法，它是 plugin 导出函数的第二个参数。系统会默认将 $ 作为方法名的前缀。
// export default ({ app }, inject) => {
//   inject('myInjectedFunction', string => console.log('That was easy!', string))
// }