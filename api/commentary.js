import request from "./index";

// 评论列表
export const getCommentList = (params) => {
  return request.get('/store/commentary/getCommentaryList', params)
}

// 回复评论
export const replyComment = (params) => {
  return request.post('/store/commentary/replyCommentary', params)
}

// 评论统计
export const countComment = (params) => {
  return request.get('/store/commentary/getCommentaryStatistics', params)
}