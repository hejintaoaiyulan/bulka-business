import dayjs from "dayjs"

export const toPromise = (fn, options) => {
    return new Promise((resolve, reject) => {
        fn({
            ...options,
            success: resolve,
            fail: reject
        })
    })
}


export const Toast = {
    success: ( title, options) => {
        wx.showToast({
            icon: 'success',
            title,
            ...options
        })
    },
    fail: (title, options) => {
        wx.showToast({
            icon: 'error',
            title,
            ...options
        })
    },
    info: ( title, options) => {
        wx.showToast({
            icon: 'none',
            title,
            ...options
        })
    }
}

export const setToken = (token, expires_in) => {
	if(token) {
		const nowT = dayjs().clone().add(expires_in, 's')
		uni.setStorageSync('tokenExpiresTime', nowT.valueOf())
        uni.setStorageSync('token', token)
	}
}

export const getToken = () => {
	const token = uni.getStorageSync('token')
	const expiresTime = uni.getStorageSync('tokenExpiresTime')
	if(!token) return ''
	if(expiresTime && dayjs(expiresTime).isSameOrAfter(dayjs(), 'seconds')) {
		// 未过期
		return token
	}
	return ''
}