import {ref, computed} from 'vue'
import {isFunction} from "lodash";

let isOpened = false
// 401鉴权失败，重新登录
export const useNotAuthModal = () => {
  const open = () => {
    if (isOpened) return
    isOpened = true
    uni.showModal({
      title: '提示',
      content: '登录已过期，请重新登录',
      showCancel: false,
      success: () => {
        uni.reLaunch({
          url: '/pages/login/index'
        })
      },
      complete: () => {
        isOpened = false
      }
    })
  }

  return {open}
}


/** 分页加载
 * @param {Function} fn
 * @param {{loadInInit?: boolean,
 *     dataKeyName?: string,
 *     size?: number,
 *     onFinish?: Function,
 *     requestParams?: Record<any, any>, transform?: Function }} options
 * */
export const usePageLoading = (
  fn,
  options
) => {
  const fnRef = ref(fn)
  const dataList = ref([])
  const keyName = options?.dataKeyName || 'list'
  const pageParams = ref({
    page: 1,
    limit: options?.size || 10
  })
  const loading = ref(false)
  const hasMore = ref(true)
  let loadDataParams = {}
  const getData = async (data, replace) => {
    loading.value = true
    try {
      loadDataParams = data
      const response = await fnRef.value({
        ...(options?.requestParams || {}),
        ...data,
        ...pageParams.value
      })
      if (replace) {
        (response.data[keyName] || []).forEach(newItem => {
          dataList.value = dataList.value.map(item => {
            if (newItem.id === item.id) {
              return {...item, ...newItem}
            }
            return item
          })
        })

      } else {
        const d = isFunction(options.transform) ? options.transform(response.data[keyName], dataList.value) : response.data[keyName]
        dataList.value = dataList.value.concat(d)
      }
      if (response.data.count <= dataList.value.length) {
        hasMore.value = false
      }
      return response
    } catch (err) {
      return Promise.reject(err)
    } finally {
      options?.onFinish?.()
      loading.value = false
    }
  }
  const reload = (data) => {
    pageParams.value.page = 1
    hasMore.value = true
    dataList.value = []
    return getData({...loadDataParams, ...(data || {})})
  }

  const loadNext = () => {
    if (loading.value || !hasMore.value) return console.log('load-next page padding')
    pageParams.value.page++
    return getData(loadDataParams).catch(err => {
      pageParams.value.page --
    })
  }

  const delItem = (id) => {
    dataList.value = dataList.value.filter(item => item.id !== id)
  }

  const dataMap = computed(() => {
    return dataList.value.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    } , {})
  })

  return {
    loadNext,
    loading,
    getData,
    reload,
    delItem,
    dataList,
    pageParams,
    dataMap
  }
}


// 控制十分钟内只显示一次的弹窗
export const useShowModalTime = () => {
  const visible = ref(false)
  const open = (shop_id, debug) => {
    let time = 1000 * 60 * 5
    if(!shop_id) return false
    if(debug) {
      time = 1000 * 10 // 调试模式下每10秒允许弹窗
    }
    // 最后一次弹窗时间
    const lastTime = uni.getStorageSync('shopActiveModal_' + shop_id)
    if(!lastTime) {
      visible.value = true
      uni.setStorageSync('shopActiveModal_' + shop_id, Date.now())
    }else {
      const now = Date.now()
      if(now - lastTime > time) {
        visible.value = true
        uni.setStorageSync('shopActiveModal_' + shop_id, Date.now())
      } else {
        console.log('5分钟内已弹窗')
      }
    }
    return visible.value
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    open,
    close
  }
}