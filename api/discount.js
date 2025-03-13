import request from "./index";

// 优惠活动列表
export const getDiscountActivityList = (params) => {
  return request.get('/store/discountActivity/discountActivityList', params)
}

// 优惠活动详情
export const getDiscountActivityInfo = (params) => {
  return request.get('/store/discountActivity/discountActivityInfo', params)
}

// 新增修改优惠活动
export const updateDiscountActivity = (params) => {
  return request.post('/store/discountActivity/saveDiscountActivity', params)
}

// 下架优惠活动
export const downDiscountActivity = (params) => {
  return request.post('/store/discountActivity/operateDiscountActivity', params)
}

// 删除优惠活动
export const deleteDiscountActivity = (params) => {
  return request.post('/store/discountActivity/delDiscountActivity', params)
}