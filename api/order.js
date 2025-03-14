import request from "./index";

// 订单列表
export const getOrderList = (params) => {
  return request.get('/store/order/getOrderList', params)
}

// 订单详情
export const getOrderDetail = (params) => {
  return request.get('/store/order/getOrderDetail', params)
}