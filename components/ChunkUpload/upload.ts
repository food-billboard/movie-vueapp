import { Upload } from 'chunk-file-upload'

const MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 5 

function exitDataFn(method: Function, onResponse: Function) {

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
    onResponse(data)
    return data 
  }

}

function uploadFn (method: Function) {
  return async function(data: any) {
    let response: any = {}
    const md5 = data.get('md5')
    const file = data.get('file')
    const index = data.get("index") as any 
    response = await method({
      md5: md5 as string,
      file: file as Blob,
      offset: (index as number) * MAX_UPLOAD_FILE_SIZE
    })
    return response
  }
}

function beforeDelete(instance: Upload, name: Symbol, fileList: any) {
  return function() {
    const target = fileList.find((item: any) => item.task.symbol === name)
    if(name) {
      instance.cancel(name)
    }
    if(target && target.url) {
      URL.revokeObjectURL(target.url)
    }
    return true 
  }
}

async function generateVideoPoster(config: any, putVideoPoster: any) {
  const { task, _id } = config 
  if(task.file.mime.startsWith("video")) {
    const result = await putVideoPoster({
      _id
    })
    return result.src || ""
  }
  return ""
}

export function upload(instance: Upload, file: File, onChange: Function, fileList: any[]) {
  const config: any = {
    status: "uploading",
    message: "上传中",
    url: isImage(file) ? URL.createObjectURL(file) : undefined
  }

  // @ts-ignore
  const exitFnRequest = this.$API_UPLOAD.checkUploadFile
  // @ts-ignore
  const uploadFile = this.$API_UPLOAD.uploadFile
  // @ts-ignore
  const putVideoPoster = this.$API_MEDIA.putVideoPoster

  const [ name ] = instance.add({
    file: {
      file
    },
    request: {
      exitDataFn: exitDataFn(exitFnRequest, function(data: any) {
        config._id = data._id 
        onChange(config)
      }),
      uploadFn: uploadFn(uploadFile),
      callback(err) {
        if(err) {
          config.status = "failed"
          config.message = "上传失败"
        }else {
          config.status = "done"
          config.message = "上传成功"
        }
        generateVideoPoster(config, putVideoPoster)
        .then((data) => {
          if(data) config.url = data 
          onChange(config)
        })
        .catch(() => {
          onChange(config)
        })
      }
    },
  })
  config.beforeDelete = beforeDelete(instance, name, fileList)

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

function isImage(file: File) {
  return file.type.startsWith("image")
}

export function formatDefaultValue(value: string | string[] | object[] | object) {
  const formatValue = Array.isArray(value) ? value : [value]
  return formatValue.map((item) => {
    if(typeof item === "string") {
      return {
        _id: item,
        url: (item.startsWith("http") || item.startsWith("localhost") || item.startsWith("blob")) ? item : undefined
      }
    }
    return item 
  })
}