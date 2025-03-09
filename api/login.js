import request from './index'

export const Login = (params) => {
    return request.post('/store/user/login', params)
}