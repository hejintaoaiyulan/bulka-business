import request from './request'
// export const baseUrl = 'https://storeapi.totxlive.com'
export const baseUrl = 'https://api.bulka.fun'
// 設置全局配置
request.config.baseUrl = baseUrl

// 添加請求攔截器（示例：添加時間戳）
request.addRequestInterceptor(async (config) => {
    // config.url += `?timestamp=${Date.now()}`
    return config
})

// 添加響應攔截器（示例：處理數據結構）
request.addResponseInterceptor(async (response) => {
    if(response.data?.code === 401) {
        return Promise.reject(response)
    }
    if (response.data.code !== 0) {
        throw new Error(response.data.message || '請求失敗')
    }
    return response
})

export default request

export const BaseUrl = baseUrl
