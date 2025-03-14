import request from "./index";

export const getUserInfo = () => {
    return request.get('/store/user/userInfo', {})
}

// 修改密碼
export const changePwd = (params) => {
    return request.post('/store/user/changePwd', params)
}

// 忘記密碼
export const forgetPwd = (params) => {
    return request.post('/store/user/forgetPwd', params)
}