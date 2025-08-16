import request from './index';

// 獲取商品分類列表
export const getGoodsTypes = () => {
  return request.get('/store/goods/getGoodsTypeList',{})
}

// 新增商品分類
export const saveGoodsType = (params) => {
  return request.post('/store/goods/saveGoodsType', params)
}

// 刪除商品分類
export const delGoodsType = (params) => {
  return request.post('/store/goods/delGoodsType',params)
}

// 獲取商品列表
export const goodsList = (params) => {
  return request.get('/store/goods/getGoodsList', params)
}

// 刪除商品
export const delGoods = (params) => {
  return request.post('/store/goods/delGoods', params)
}

// 商品上下架 publish_status 1 上架 2 下架
export const goodsPublish = (params) => {
  return request.post('/store/goods/setGoodsPublish', params)
}

// 保存商品
export const saveGoods = (params) => {
  return request.post('/store/goods/saveGoods',params)
}

// 商品詳情
export const getGoodsInfo = (params) => {
  return request.get('/store/goods/getGoodsInfo', params)
}