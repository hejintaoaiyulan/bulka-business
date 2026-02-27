import request from "./index";

// 試吃活動列表
export const getTastingList = (params) => {
  return request.get('/store/tastingActivity/tastingActivityList', params)
}

// 試吃活動詳情
export const getTastingDetail = (params) => {
  return request.get('/store/tastingActivity/tastingActivityInfo', params)
}

// 下架結束試吃活動
export const overTasting = (params) => {
  return request.post('/store/tastingActivity/operateTastingActivity', params)
}

// 新增修改試吃活動
export const addTasting = (params) => {
  return request.post('/store/tastingActivity/saveTastingActivity', params)
}

// 刪除試吃活動
export const delTasting = (params) => {
  return request.post('/store/tastingActivity/delTastingActivity', params)
}
