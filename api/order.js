import request from "./index";

// 訂單列表
export const getOrderList = (params) => {
  return request.get('/store/order/orderList', params)
}

// 訂單詳情
export const getOrderDetail = (params) => {
  return request.get('/store/order/orderInfo', params)
}

// 取消訂單
export const cancelOrder = (params) => {
  return request.post('/store/order/cancelOrder', params)
}

// 接單
export const AcceptOrder = (params) => {
  return request.post('/store/order/acceptOrder', params)
}

// 出餐
export const ServingFood = (params) => {
  return request.post('/store/order/servingFood', params)
}

// 掃碼取餐
export const scanOrder = (params) => {
  console.log(params)
  return request.post('/store/order/scanOrder', params)
}

// 停止播報
export const stopOrderPush = (params) => {
  return request.post('/store/order/stopOrderPush', params)
}
