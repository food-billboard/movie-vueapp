declare namespace API_USER {

  export interface IGetHomeClassifyList {
    count?: number 
  }

  export interface IGetRankNameListParams {
    count?: number 
  }

  export interface IGetRankListParams {
    _id: string 
    currPage?: number 
    pageSize?: number 
    glance?: 1 | -1 
    author_rate?: 1 | -1 
    hot?: 1 | -1 
    rate_person?: 1 | -1 
    total_rate?: 1 | -1 
  }

  export interface IGetSearchListParams {
    currPage?: number 
    pageSize?: number 
    content?: string 
    area?: string 
    director?: string 
    actor?: string 
    lang?: string 
    time?: string 
    sort?: string 
    classify?: string 
  }

  export interface IGetMovieDetailParams {
    _id: string 
  }

  export interface IGetMovieDetailData {
    author: {
      username: string 
      _id: string 
    }
    author_description: string 
    author_rate: number 
    comment: {
      user_info: {
        username: string 
        avatar: string 
        description: string 
      }
      content: {
        text: string 
      }
      _id: string 
    }[]
    createdAt: string 
    updatedAt: string 
    glance: number 
    hot: number 
    images: string[] 
    name: string 
    poster: string 
    rate: string 
    same_film: {
      name: string 
      _id: string 
      same_type: "SERIES" | "NAMESAKE"
    }[]
    store: boolean 
    tag: {
      text: string 
    }[]
    video: string 
    _id: string 
    info: {
      actor: {
        name: string 
        other: {
          avatar: string 
        }
      }[]
      another_name: string[] 
      classify: {
        name: string 
      }[]
      description: string 
      director: {
        name: string
      }[]
      district: {
        name: string
      }[]
      language: {
        name: string
      }[]
      name: string 
      screen_time: string 
    }
  }
  export interface IGetAttentionsParams {
    _id: string 
    currPage?: number 
    pageSize?: number 
  }

  export interface IGetAttentionData {
    _id: string 
    username: string
    description: string 
    avatar: string 
  }

  export interface IGetBrowserListData {
    description: string 
    name: string
    poster: string 
    _id: string 
    store: boolean 
    rate: number 
    classify: { name: string }[]
    publish_time: string 
    hot: number 
  }

  export interface IGetSearchListData {
    _id: string 
    glance: number 
    hot: number 
    name: string 
    source_type: "comment" | "movie" 
    status: "VERIFY" | "COMPLETE" | "NOT_VERIFY"
    createdAt: string 
    updatedAt: string 
    images: string[] 
    author: {
      _id: string 
      username: string 
      avatar: string 
    }
    publish_time: string 
    classify: string[]
    description: string 
    rate: number 
  }

  export interface IGetSearchOrderList {
    name: string 
    _id: string 
  }

  export interface IGetRankListData {
    author_rate: number 
    description: string 
    name: string
    poster: string
    _id: string
    store: boolean
    rate: number 
    images: string[]
    classify: { name: string }[]
    publish_time: string 
    hot: number 
  }

  export interface IGetRankNameListData {
    name: string 
    icon: string 
    _id: string 
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

  export interface IGetAnotherUserInfo {
    _id: string 
    hot: number 
    attentions: number 
    avatar: string 
    description: string 
    fans: number 
    username: string 
    createdAt: string 
    updatedAt: string 
    like: boolean 
  }

  export interface IGetMovieDetailSimple {
    description: string 
    name: string 
    poster: string 
    _id: string 
  }

  export interface IGetMovieCommentData {
    comment_users: {
      avatar: string 
      username: string
      _id: string 
    }[]
    content: {
      images: string[]
      video: {
        src: string 
        poster: string 
      }[]
      text: string 
    }
    createdAt: string
    updatedAt: string 
    like: boolean 
    total_like: number 
    _id: string 
    user_info: {
      _id: string 
      avatar: string 
      username: string 
    }
  }

  export interface IGetCommentDetailData {
    comment: IGetMovieCommentData,
    sub: IGetMovieCommentData[]
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

  export interface IGetCustomerUserInfo extends Omit<API_USER.IGetAnotherUserInfo, "like"> {
    friend_id: string 
    friends: number 
    mobile: number
    email: string 
  }

  export interface IGetMovieDetailParams {
    _id: string 
  }

  export interface IPutUsernameParams {
    name: string 
  }

  export interface IPutFeedbackParams {
    content: {
      text?: string
      image?: string[]
      video?: string[]
    }
  }

  export interface IGetSelfAttentionParams {
    currPage?: number 
    pageSize?: number 
  }

  export interface IGetSelfAttentionData {
    _id: string 
    username: string
    description: string 
    avatar: string 
  }

  export interface IGetSelfBrowserListData extends API_USER.IGetBrowserListData {}

  export interface IGetBrowserListData extends API_USER.IGetBrowserListData {}

  export interface IPostCommentParams {
    _id: string 
    content: {
      image: string[]
      video: string[]
      text: string 
    }
  }

  export interface IGetCommentDetailData {
    comment: API_USER.IGetMovieCommentData,
    sub: API_USER.IGetMovieCommentData[]
  }

  export interface IGetIssueMovieData {
    author_description: string 
    author_rate: number 
    images: {
      _id: string
      src: string 
    }[]
    name: string 
    video: {
      _id: string 
      src: string
    }
    poster: {
      _id: string 
      src: string
    }
    _id: string 
    info: {
      actor: string[]
      another_name: string[] 
      classify: string[]
      description: string 
      director: stirng[]
      district: string[] 
      language: string[]
      name: string 
      screen_time: string 
    }
  }

  export interface IPostMovieData {
    video: {
      src: string
      poster: string 
    }
    images: string[]
    info: {
      name: string 
      district: string[] 
      director: string[] 
      actor: string[] 
      classify: string[] 
      screen_time: string 
      description: string 
      language: string[] 
      author_rate: number 
      another_name: string[] 
      author_description: string 
    }
  }

  export interface IPutMovieData extends IPostMovieData {
    _id: string 
  }

}

declare namespace API_MEDIA {
  
  export interface IPutMoviePosterParams {
    _id: string 
    name?: string 
    origin_type?: "ORIGIN"| "USER"
    auth?: "PUBLIC" | "PRIVATE"
    time?: string 
    overlap?: boolean 
  }

}

