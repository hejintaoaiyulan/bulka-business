// utils/request.js

import {getToken, Toast} from "../utils"
import {useNotAuthModal} from "../hooks";

const {open} = useNotAuthModal()
const config = {
  baseUrl: '', // 基礎地址
  timeout: 15000, // 超時時間
  showLoading: true, // 默認顯示loading
  loadingText: '加載中...',
  retryCount: 2, // 請求重試次數
  retryDelay: 1000, // 重試延遲時間
  withToken: true, // 默認攜帶token
  contentType: 'application/json'
}

// 請求隊列
const requestQueue = new Map()

// 請求攔截器
const requestInterceptors = []

// 響應攔截器
const responseInterceptors = []

/**
 * 添加請求攔截器
 */
function addRequestInterceptor(interceptor) {
  requestInterceptors.push(interceptor)
}

/**
 * 添加響應攔截器
 */
function addResponseInterceptor(interceptor) {
  responseInterceptors.push(interceptor)
}

/**
 * 通用請求方法
 * @param {Object} options 請求配置
 */
async function request(options) {
  try {
    // 合併配置
    const mergedOptions = {
      ...config,
      ...options,
      header: {
        'Content-Type': config.contentType,
        ...options.header
      }
    }

    // 生成請求唯一標識
    const requestKey = `${options.url}_${Date.now()}`

    // 執行請求攔截器
    for (const interceptor of requestInterceptors) {
      await interceptor(mergedOptions)
    }

    // 攜帶token
    if (mergedOptions.withToken) {
      const token = getToken()
      const tokenType = uni.getStorageSync('token_type')
      if (token) {
        mergedOptions.header.Authorization = `${tokenType} ${token}`
      }
    }

    // 顯示loading
    if (mergedOptions.showLoading) {
      console.log('顯示loading')
      uni.showLoading({
        title: mergedOptions.loadingText,
        mask: true
      })
    }

    // 創建請求
    const requestTask = uni.request({
      url: mergedOptions.baseUrl.concat(mergedOptions.url),
      method: mergedOptions.method || 'GET',
      data: mergedOptions.data,
      header: mergedOptions.header,
      timeout: mergedOptions.timeout
    })

    // 加入請求隊列
    requestQueue.set(requestKey, requestTask)

    // 發送請求
    const [error, res] = await retryRequest(requestTask, mergedOptions)

    // 請求完成從隊列移除
    requestQueue.delete(requestKey)

    // 處理響應
    if (error) {
      throw error
    }

    // 執行響應攔截器
    let response = res
    // 處理業務邏輯錯誤
    if (response.statusCode !== 200) {
      throw new Error(response.data.message || '請求失敗')
    }

    for (const interceptor of responseInterceptors) {
      response = await interceptor(response)
    }


    return response.data
  } catch (error) {
    // 錯誤處理
    handleError(error, options)
    throw error
  } finally {
    // 隱藏loading
    // if (options.showLoading !== false) {
    //
    // }
    uni.hideLoading()
  }
}

/**
 * 重試請求
 */
function retryRequest(task, options, count = 0) {
  return new Promise(resolve => {
    task.then(res => {
      resolve([null, res])
    }).catch(error => {
      if (count < options.retryCount) {
        setTimeout(() => {
          console.log(`請求重試第${count + 1}次`)
          resolve(retryRequest(task, options, count + 1))
        }, options.retryDelay)
      } else {
        resolve([error, null])
      }
    })
  })
}

/**
 * 錯誤處理
 */
function handleError(error, options) {
  console.log('請求錯誤:', error)
  console.log(options)

  // 顯示錯誤提示
  if (options.showErrorToast !== false) {
    Toast.info(error.message || '網絡異常，請稍後重試')
  }

  // 未登錄處理
  if (error.statusCode === 401 || error?.data?.code === 401) {
    // 跳轉到登錄頁
    // uni.navigateTo({
    //     url: '/pages/login/login'
    // })
    // 提示登錄失效
    open()
  }
}

/**
 * GET請求
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
 * POST請求
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
 * PUT請求
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
 * DELETE請求
 */
function del(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'DELETE',
    ...options
  })
}


// 導出方法
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