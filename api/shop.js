import request from "./index";

// 獲取店鋪裝修信息
export const getShopInfo = () => {
  return request.get('/store/shop/getShopInfo', {})
}

// 修改店鋪裝修信息
export const updateShopInfo = (params) => {
  return request.post('/store/shop/editShop', params)
}

// 獲取店鋪信息統計
export const shopStatictis = () => {
  return request.get('/store/shop/shopStatistics', {})
}

// 獲取店鋪的統計數據
export const getShopToDayStatistics = (params) => {
  return request.get('/store/shop/toDayStatistics', params)
}