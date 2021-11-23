declare namespace API_USER {

  export interface IGetHomeClassifyList {
    count?: number 
  }

  export interface IGetClassifyListParams {
    _id: string 
    currPage?: number 
    pageSize?: number 
  }

  export interface IGetClassifyNameListData {
    name: string 
    poster: string 
    _id: string 
    key: string 
  }

  export interface IGetClassifyListData {
    hot: number 
    images: string[]
    classify: { name: string }[]
    publish_time: string 
    name: string 
    poster: string 
    _id: string 
  }

  export interface IGetHomeDailyList {
    count?: number 
  }

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

declare namespace API_CUSTOMER {

  export interface IGetMovieDetailParams {
    _id: string 
  }

  export interface IPutUsernameParams {
    name: string 
  }

}