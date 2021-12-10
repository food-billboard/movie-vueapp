
# 完成度情况统计  

## 颜色根据色调设置  
- 利用`class`设置不同的色调，须同时使用下面两个类型以及`realColorClass`  
类型有 `primary`、`secondary`、`disabled`、`thirdly`、`bgColor`  
样式类型有 `border-color`、`background-color`、`color`  

- 当用到其他颜色时，可以使用`style`进行设置  
添加`generateStyleColor(level)`设置颜色   

- 非页面文件需自行引入`/mixins/layout.js` 文件  

## 公共组件  

1. 卡片形式电影列表 `/components/CardMovie`  
2. 列表形式电影列表 `/components/ListMovie`  
3. 懒加载列表  `/components/List`  
4. 文件上传  `/components/ChunkUpload`  
5. 评论组件 `/components/Comment`  
6. 用户列表组件 `/components/UserItem`  
7. 评论列表组件 `/components/CommentItem`  
8. 视频预览组件 `/components/VideoPreview`  
暂时只是mock，具体功能还未完成，但是调用方法是固定的  
9. 索引选择组件  `/components/IndexSelect`  

## 首页 
- 路由  
/home 
- 是否完成: 是  
- 内容完成情况
1. 轮播图 ✅    
2. 搜索 ✅   
3. 每日上新 ✅  
4. 分类✅  
5. 排行榜✅  

## 登录  
- 登录   
/login 
- 是否完成: 是  

## 分类  
- 分类  
/classify  
- 是否完成: 是  
- 内容  
1. 卡片形式电影列表  ✅
2. 列表形式电影列表  ✅
3. 懒加载列表组件  ✅  

## 我的  
- 个人中心页面  
/mine  
- 是否完成: 是  
当中也包含新增了一些空白页面，做路由跳转，后面直接在那些页面上进行开发  

## 反馈页面  
- 个人中心里面的反馈页面  
/feedback  
- 是否完成: 是  

## 基础设置页面  
- 个人中心里面的个人信息设置页面  
/base-setting  
- 是否完成: 是  

## 排行榜页面  
- 排行榜列表页面  
/rank  
- 是否完成: 是  

## 搜索页面  
- 数据搜索页面  
/search  
- 是否完成: 是  

## 关注用户页面  
- 关注用户页面，目前只验证了自己的关注  
/attentions  
- 是否完成: 是  

## 用户粉丝页面  
- 关注用户页面，目前只验证了自己的粉丝  
/attentions  
- 是否完成: 是   

## 用户浏览记录页面  
- 用户浏览记录页面，目前只验证了自己的粉丝  
/browser  
- 是否完成: 是   

## 用户收藏页面  
- 用户收藏页面，目前只验证了自己的收藏  
/store  
- 是否完成: 是  

## 用户发布电影页面  
- 用户发布电影列表页面，目前只验证了自己的发布  
/issue-list  
- 是否完成: 是  

## 用户信息  
- 用户信息  
/user    
- 是否完成: 是  

## 评论页面  
- 评论  
/comment     
- 是否完成: 是  

## 电影评论列表页面
- 评论列表页面  
/comment-list  
- 是否完成: 是  

## 评论详情列表页面
- 评论详情列表页面  
/comment-detail  
- 是否完成: 是  

## 我的评论页面
- 我的评论页面  
/comment-mine  
- 是否完成: 是  

## 电影发布页面
- 电影发布页面  
/issue  
- 是否完成: 是  
