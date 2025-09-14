import request from "./index";

export const UploadUrl = '/store/index/uploadImage'

/**
 * 獲取驗證碼
 * @param {{prefix?: string, mobile?: string, type: 'register' | 'forget' | 'oldmobile' | 'newmobile' | 'changepwd'}} params
 * */
export const getSMSCode = (params) => {
    return request.post('/store/index/getSms', params)
}

/**
 * 提交入駐資料
 * @param {{shop_avatar: string, shop_name: string, shop_type: string | number, contact_name: string, contact_tel: string, address: string, material_image: string,director_images:string[],company_tel: string, bank_acccount: string }} params
 * */
export const SaveShopCheck = (params) => {
    return request.post('/store/user/saveShopCheck', params)
}

/**
 * 獲取上次提交的入駐資料
 * */
export const getShopCheck = () => {
    return request.get('/store/user/getShopCheck',{})
}

/**
 * 商家入駐分類列表
 * */
export const getShopType = () => {
    return request.get('/store/index/shopType',{})
}

/**
 * 平臺商品分類
 * */
export const getGoodsCategory = () => {
    return request.get('/store/index/goodsCategoryList',{})
}

/**
 * 常見問題
 * */
export const getQuestionAnswer = () => {
    return request.get('/store/index/fqa',{})
}

/**
 * 校驗驗證碼
 * @param {{prefix: string, mobile: string, type: 'forget' | 'oldmobile', code: string }} params
 * */
export const verifySms = (params) => {
    return request.post('/store/index/verifySms',params)
}

/** 獲取店鋪設置 */
export const getShopSetting = () => {
    return request.get('/store/index/config', {})
}

/** 綁定clientID ws */
export const bindClientId = (params) => {
    return request.post('/store/index/bindws', params)
}

/** 用戶反饋 */
export const sendFeedback = (params) => {
    return request.post('/store/index/feedback', params)
}

/** 获取系统信息 */
export const getSystemPublicConfig = () => {
    return request.get('/store/index/init', {})
}
