import { Upload } from 'chunk-file-upload'

const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 5 

function exitDataFn(method: Function) {

  return async function(params: {
    filename: string
    md5: string
    suffix: string
    size: number
    chunkSize: number
    chunksLength: number
  }) {
    const { size, suffix, md5, chunkSize } = params
    const data = await method({
      auth: "PUBLIC",
      mime: suffix,
      chunk: chunkSize,
      md5,
      size,
      name: md5
    })
    return data 
  }

}

function uploadFn (instance: Upload, method: Function) {
  return async function(data: any, name: Symbol) {
    const task = instance.getTask(name)
    const size = (task!.file.file as File).size 
    let response: any = {}
    const md5 = data.get('md5')
    const file = data.get('file')
    const index = data.get("index") as any 
    try {
      response = await method({
        md5: md5 as string,
        file: file as Blob,
        offset: (index as number) * MAX_UPLOAD_FILE_SIZE
      })
    }catch(err) {
      
    }
    const nextOffset = response["upload-offset"] ?? response["Upload-Offset"]
    if(nextOffset >= size) return {
      data: size
    }
    return {
      data: nextOffset >= size ? size : nextOffset
    }
  }
}

function beforeDelete(instance: Upload, name: Symbol) {
  return function() {
    if(name) {
      instance.cancel(name)
    }
    return true 
  }
}

export function upload(instance: Upload, file: File, onChange: Function) {
  const config: any = {
    status: "uploading",
    message: "上传中",
  }

  // @ts-ignore
  const exitFnRequest = this.$API_UPLOAD.checkUploadFile
  // @ts-ignore
  const uploadFile = this.$API_UPLOAD.uploadFile

  const [ name ] = instance.add({
    file: {
      file
    },
    request: {
      exitDataFn: exitDataFn(exitFnRequest),
      uploadFn: uploadFn(instance, uploadFile),
      callback(err) {
        if(err) {
          config.status = "failed"
          config.message = "上传失败"
        }else {
          config.status = "done"
          config.message = "上传成功"
        }
      }
    },
  })
  config.beforeDelete = beforeDelete(instance, name)

  if(!name) {
    config.status = "failed"
    config.message = "上传失败"
  }else {
    instance.deal(name)
    const task = instance.getTask(name)
    config.task = task 
  }

  onChange(config)
  
}