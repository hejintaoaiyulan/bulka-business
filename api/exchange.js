import request from "./index";

// 換購活動列表
export const getExchangeList = (params) => {
  return request.get('/store/exchangeActivity/exchangeActivityList', params)
}

// 換購活動詳情
export const getExchangeDetail = (params) => {
  return request.get('/store/exchangeActivity/exchangeActivityInfo', params)
}

// 下架結束換購活動
export const overExchange = (params) => {
  return request.post('/store/exchangeActivity/operateExchangeActivity', params)
}

// 新增修改換購活動
export const addExchange = (params) => {
  return request.post('/store/exchangeActivity/saveExchangeActivity', params)
}

// 刪除換購活動
export const delExchange = (params) => {
  return request.post('/store/exchangeActivity/delExchangeActivity', params)
}