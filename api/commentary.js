import request from "./index";

// 評論列表
export const getCommentList = (params) => {
  return request.get('/store/commentary/getCommentaryList', params)
}

// 回覆評論
export const replyComment = (params) => {
  return request.post('/store/commentary/replyCommentary', params)
}

// 評論統計
export const countComment = (params) => {
  return request.get('/store/commentary/getCommentaryStatistics', params)
}