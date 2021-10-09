declare namespace API_USER {

  export interface IPostLoginParams {
    mobile: string | number 
    password: string 
  }

  export interface IPostRegisterParams {
    mobile: string | number 
    password: string 
    email: string 
    captcha: string 
    username?: string 
    description?: string 
    avatar?: string 
  }

  export interface IPutForgetParams {
    password: string 
    email: string 
    captcha: string 
  }

  export interface IPostEmailParams {
    email: string 
    type: "forget" | "register"
  }

}

declare namespace API_UPLOAD {
  export interface IDeleteParams {
    _id: string
  }

  export interface ILooadParams {
    load: string
  }

  export interface IGetMediaListParams {
    currPage?: number 
    pageSize?: number 
    content?: string 
    type: 0 | 1 | 2
    _id?: string 
    // origin_type?:  "USER" | "SYSTEM"
    auth?: "PUBLIC" | "PRIVATE"
    status?: "ERROR" | "COMPLETE" | "UPLOADING"
    size?: number | string 
  } 

  export interface IGetMediaListData {
    
  }

  export interface IGetMediaListRes {
    total: number 
    list: IGetMediaListData[]
  }

  export interface IPutVideoPosterParams {
    data: string 
  }

  export type TAuathType = "PRIVATE" | "PUBLIC"

  export interface IUploadParams {
    md5: string
    offset: number
    file: Blob
  }

  export interface IUploadRes {
    "Upload-Offset": number 
  }

  export interface ICheckUploadFileParams {
    "Tus-Resumable": "1.0.0"
    md5: string 
    auth: TAuathType 
    size: number 
    mime: string
    name?: string 
    chunk: number 
  }

  export interface ICheckUploadFileRes {
    "Tus-Resumable": "1.0.0"
    location: string 
    "Upload-Offset": number 
    "Upload-Length": number 
    "Upload-Id": string 
  }

  export interface IGetMediaDataParams {
    load: string 
  }
}