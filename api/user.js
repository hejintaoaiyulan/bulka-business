import request from "./index";

export const getUserInfo = () => {
    return request.get('/store/user/userInfo', {})
}