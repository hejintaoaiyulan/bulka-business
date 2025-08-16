import request from "./index";

// 優惠活動列表
export const getDiscountActivityList = (params) => {
  return request.get('/store/discountActivity/discountActivityList', params)
}

// 優惠活動詳情
export const getDiscountActivityInfo = (params) => {
  return request.get('/store/discountActivity/discountActivityInfo', params)
}

// 新增修改優惠活動
export const updateDiscountActivity = (params) => {
  return request.post('/store/discountActivity/saveDiscountActivity', params)
}

// 下架結束優惠活動 status 3 下架 4 結束
export const downDiscountActivity = (params) => {
  return request.post('/store/discountActivity/operateDiscountActivity', params)
}

// 刪除優惠活動
export const deleteDiscountActivity = (params) => {
  return request.post('/store/discountActivity/delDiscountActivity', params)
}