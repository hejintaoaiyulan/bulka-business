// utils/request.js

import {getToken, Toast} from "../utils"
import {useNotAuthModal} from "../hooks";

const {open} = useNotAuthModal()
const config = {
  baseUrl: '', // 基础地址
  timeout: 15000, // 超时时间
  showLoading: true, // 默认显示loading
  loadingText: '加载中...',
  retryCount: 2, // 请求重试次数
  retryDelay: 1000, // 重试延迟时间
  withToken: true, // 默认携带token
  contentType: 'application/json'
}

// 请求队列
const requestQueue = new Map()

// 请求拦截器
const requestInterceptors = []

// 响应拦截器
const responseInterceptors = []

/**
 * 添加请求拦截器
 */
function addRequestInterceptor(interceptor) {
  requestInterceptors.push(interceptor)
}

/**
 * 添加响应拦截器
 */
function addResponseInterceptor(interceptor) {
  responseInterceptors.push(interceptor)
}

/**
 * 通用请求方法
 * @param {Object} options 请求配置
 */
async function request(options) {
  try {
    // 合并配置
    const mergedOptions = {
      ...config,
      ...options,
      header: {
        'Content-Type': config.contentType,
        ...options.header
      }
    }

    // 生成请求唯一标识
    const requestKey = `${options.url}_${Date.now()}`

    // 执行请求拦截器
    for (const interceptor of requestInterceptors) {
      await interceptor(mergedOptions)
    }

    // 携带token
    if (mergedOptions.withToken) {
      const token = getToken()
      const tokenType = uni.getStorageSync('token_type')
      if (token) {
        mergedOptions.header.Authorization = `${tokenType} ${token}`
      }
    }

    // 显示loading
    if (mergedOptions.showLoading) {
      console.log('显示loading')
      uni.showLoading({
        title: mergedOptions.loadingText,
        mask: true
      })
    }

    // 创建请求
    const requestTask = uni.request({
      url: mergedOptions.baseUrl.concat(mergedOptions.url),
      method: mergedOptions.method || 'GET',
      data: mergedOptions.data,
      header: mergedOptions.header,
      timeout: mergedOptions.timeout
    })

    // 加入请求队列
    requestQueue.set(requestKey, requestTask)

    // 发送请求
    const [error, res] = await retryRequest(requestTask, mergedOptions)

    // 请求完成从队列移除
    requestQueue.delete(requestKey)

    // 处理响应
    if (error) {
      throw error
    }

    // 执行响应拦截器
    let response = res
    // 处理业务逻辑错误
    if (response.statusCode !== 200) {
      throw new Error(response.data.message || '请求失败')
    }

    for (const interceptor of responseInterceptors) {
      response = await interceptor(response)
    }


    return response.data
  } catch (error) {
    // 错误处理
    handleError(error, options)
    throw error
  } finally {
    // 隐藏loading
    // if (options.showLoading !== false) {
    //
    // }
    uni.hideLoading()
  }
}

/**
 * 重试请求
 */
function retryRequest(task, options, count = 0) {
  return new Promise(resolve => {
    task.then(res => {
      resolve([null, res])
    }).catch(error => {
      if (count < options.retryCount) {
        setTimeout(() => {
          console.log(`请求重试第${count + 1}次`)
          resolve(retryRequest(task, options, count + 1))
        }, options.retryDelay)
      } else {
        resolve([error, null])
      }
    })
  })
}

/**
 * 错误处理
 */
function handleError(error, options) {
  console.log('请求错误:', error)

  // 显示错误提示
  if (options.showErrorToast !== false) {
    Toast.info(error.message || '网络异常，请稍后重试')
  }

  // 未登录处理
  if (error.statusCode === 401 || error?.data?.code === 401) {
    // 跳转到登录页
    // uni.navigateTo({
    //     url: '/pages/login/login'
    // })
    // 提示登录失效
    open()
  }
}

/**
 * GET请求
 */
function get(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'GET',
    ...options
  })
}

/**
 * POST请求
 */
function post(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'POST',
    ...options
  })
}

/**
 * PUT请求
 * */
function put(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'PUT',
    ...options
  })
}

/**
 * DELETE请求
 */
function del(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'DELETE',
    ...options
  })
}


// 导出方法
export default {
  config,
  request,
  get,
  post,
  put,
  del,
  addRequestInterceptor,
  addResponseInterceptor
}