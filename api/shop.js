import request from "./index";

// 获取店铺装修信息
export const getShopInfo = () => {
  return request.get('/store/shop/getShopInfo', {})
}

// 修改店铺装修信息
export const updateShopInfo = (params) => {
  return request.put('/store/shop/getShopInfo', params)
}