import request from './request'

// 设置全局配置
request.config.baseUrl = 'https://storeapi.totxlive.com'

// 添加请求拦截器（示例：添加时间戳）
request.addRequestInterceptor(async (config) => {
    // config.url += `?timestamp=${Date.now()}`
    return config
})

// 添加响应拦截器（示例：处理数据结构）
request.addResponseInterceptor(async (response) => {
    if (response.data.code !== 0) {
        throw new Error(response.data.message || '请求失败')
    }
    return response
})

export default request