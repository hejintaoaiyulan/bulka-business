import request from "./index";

// 订单列表
export const getOrderList = (params) => {
  return request.get('/store/order/orderList', params)
}

// 订单详情
export const getOrderDetail = (params) => {
  return request.get('/store/order/orderInfo', params)
}

// 取消订单
export const cancelOrder = (params) => {
  return request.post('/store/order/cancelOrder', params)
}

// 接单
export const AcceptOrder = (params) => {
  return request.post('/store/order/acceptOrder', params)
}

// 出餐
export const ServingFood = (params) => {
  return request.post('/store/order/servingFood', params)
}

// 扫码取餐
export const scanOrder = (params) => {
  console.log(params)
  return request.post('/store/order/scanOrder', params)
}