import request from './index'

export const Login = (params) => {
    return request.post('/store/user/login', params)
}

export const Register = (params) => {
    return request.post('/store/user/register', params)
}
