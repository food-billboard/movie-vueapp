import user from './user'
import customer from './customer'
import upload from './upload'
import media from './media'

export default (...args) => {
  user(...args)
  customer(...args)
  upload(...args)
  media(...args)
}