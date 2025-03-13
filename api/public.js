import request from "./index";

export const UploadUrl = '/store/index/uploadImage'

/**
 * 获取验证码
 * @param {{prefix?: string, mobile?: string, type: 'register' | 'forget' | 'oldmobile' | 'newmobile' | 'changepwd'}} params
 * */
export const getSMSCode = (params) => {
    return request.post('/store/index/getSms', params)
}

/**
 * 提交入驻资料
 * @param {{shop_avatar: string, shop_name: string, shop_type: string | number, contact_name: string, contact_tel: string, address: string, material_image: string,director_images:string[],company_tel: string, bank_acccount: string }} params
 * */
export const SaveShopCheck = (params) => {
    return request.post('/store/user/saveShopCheck', params)
}

/**
 * 获取上次提交的入驻资料
 * */
export const getShopCheck = () => {
    return request.get('/store/user/getShopCheck',{})
}

/**
 * 商家入驻分类列表
 * */
export const getShopType = () => {
    return request.get('/store/index/shopType',{})
}

/**
 * 平台商品分类
 * */
export const getGoodsCategory = () => {
    return request.get('/store/index/goodsCategoryList',{})
}