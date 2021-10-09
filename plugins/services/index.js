import user from './user'
import customer from './customer'
import upload from './upload'

export default (...args) => {
  user(...args)
  customer(...args)
  upload(...args)
}