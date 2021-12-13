import { mergeWith, merge } from 'lodash'

export class StorageManager {

  setStorage(key: string, value: any, mergeType:boolean | Function =true) {
    const prevValue = this.getStorage(key)
    let newValue 
    if(typeof value === "function") {
      newValue = value(prevValue)
    }else if(Array.isArray(prevValue) || Object.prototype.toString.call(prevValue) === "[object Object]"){
      if(!mergeType) {
        newValue = value 
      }else if(typeof mergeType === "function") {
        newValue = mergeWith(prevValue, value, mergeType)
      }else {
        newValue = merge(prevValue, value)
      }
    }else {
      newValue = value 
    }
    localStorage.setItem(key, JSON.stringify(newValue))
    return newValue
  }

  getStorage(key: string) {
    const value = localStorage.getItem(key)
    return value === null ? null : JSON.parse(value)
  }

}

let instance: any 

function generateStorage() {
  if(instance) return instance
  instance = new StorageManager()
  return instance 
}

export default generateStorage