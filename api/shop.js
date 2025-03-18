import request from "./index";

// 获取店铺装修信息
export const getShopInfo = () => {
  return request.get('/store/shop/getShopInfo', {})
}

// 修改店铺装修信息
export const updateShopInfo = (params) => {
  return request.post('/store/shop/editShop', params)
}

// 获取店铺信息统计
export const shopStatictis = () => {
  return request.get('/store/shop/shopStatistics', {})
}