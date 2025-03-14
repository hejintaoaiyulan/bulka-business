import request from "./index";

// 换购活动列表
export const getExchangeList = (params) => {
  return request.get('/store/exchangeActivity/exchangeActivityList', params)
}

// 换购活动详情
export const getExchangeDetail = (params) => {
  return request.get('/store/exchangeActivity/exchangeActivityInfo', params)
}

// 下架结束换购活动
export const overExchange = (params) => {
  return request.post('/store/exchangeActivity/operateExchangeActivity', params)
}

// 新增修改换购活动
export const addExchange = (params) => {
  return request.post('/store/exchangeActivity/saveExchangeActivity', params)
}

// 删除换购活动
export const delExchange = (params) => {
  return request.post('/store/exchangeActivity/delExchangeActivity', params)
}