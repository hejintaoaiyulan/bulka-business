import {ref, computed, onUnmounted} from 'vue'
import {isFunction, omit} from "lodash";


let isOpened = false
// 401鑑權失敗，重新登錄
export const useNotAuthModal = () => {
  const isVisitor = uni.getStorageSync('is_visitor') === '1'
  const tip = isVisitor ? '當前為遊客模式，請登錄後操作' : '登錄已過期，請重新登錄'
  const open = () => {
    if (isOpened) return
    isOpened = true
    if (isVisitor) {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const isLogin = page.route.includes('pages/login/index')
      if (!isLogin)
        uni.navigateTo({
          url: '/pages/login/index?from=page',
          complete: () => {
            isOpened = false
          }
        })
      else {
        isOpened = false
      }
    } else
      uni.showModal({
        title: '提示',
        content: tip,
        showCancel: false,
        success: (result) => {
          if (result.confirm)
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


/** 分頁加載
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
    limit: options?.size || 10,
    total: 0
  })
  const loading = ref(false)
  const hasMore = ref(true)
  let loadDataParams = {}
  const getData = async (data, replace) => {
    loading.value = true
    try {
      loadDataParams = data
      const response = await fnRef.value(omit({
        ...(options?.requestParams || {}),
        ...data,
        ...pageParams.value
      }, ['total']))
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
      pageParams.value.total = response.data.count || 0
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
      pageParams.value.page--
    })
  }

  const delItem = (id) => {
    dataList.value = dataList.value.filter(item => item.id !== id)
  }

  const dataMap = computed(() => {
    return dataList.value.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
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


// 控制十分鐘內只顯示一次的彈窗
export const useShowModalTime = () => {
  const visible = ref(false)
  const open = (shop_id, debug) => {
    let time = 1000 * 60 * 5
    if (!shop_id) return false
    if (debug) {
      time = 1000 * 10 // 調試模式下每10秒允許彈窗
    }
    // 最後一次彈窗時間
    const lastTime = uni.getStorageSync('shopActiveModal_' + shop_id)
    if (!lastTime) {
      visible.value = true
      uni.setStorageSync('shopActiveModal_' + shop_id, Date.now())
    } else {
      const now = Date.now()
      if (now - lastTime > time) {
        visible.value = true
        uni.setStorageSync('shopActiveModal_' + shop_id, Date.now())
      } else {
        console.log('5分鐘內已彈窗')
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

export function useWebSocket(url, options = {}) {
  const {
    autoConnect,
    reconnectInterval = 5000,
    onMessage,
    onOpen,
    onClose,
    onError,
  } = options

  const socket = ref(null)
  const isUserStop = ref(false)
  const isConnected = ref(false)
  const reconnectTimer = ref(null)

  const connect = () => {
    if (!url || isConnected.value) return

    socket.value = uni.connectSocket({
      url, method: options.method || 'GET', complete: () => {
      }
    })

    socket.value.onOpen?.((res) => {
      isConnected.value = true
      onOpen && onOpen(res)
    })

    socket.value.onMessage?.((msg) => {
      const data = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data
      onMessage && onMessage(data)
    })

    socket.value.onClose?.((res) => {
      isConnected.value = false
      onClose && onClose(res)
      if (!isUserStop.value)
        reconnect()
    })

    socket.value.onError?.((err) => {
      console.log(url)
      isConnected.value = false
      onError && onError(err)
      if (!isUserStop.value)
        reconnect()
    })
  }

  const reconnect = () => {
    if (reconnectTimer.value) return
    reconnectTimer.value = setTimeout(() => {
      reconnectTimer.value = null
      connect()
    }, reconnectInterval)
  }

  const send = (data) => {
    if (isConnected.value && socket.value) {
      socket.value.send({
        data: typeof data === 'string' ? data : JSON.stringify(data),
      })
    } else {
      console.warn('WebSocket 未連接，消息未發送')
    }
  }

  const close = (flag) => {
	  isUserStop.value = !!flag
    if (socket.value) {
      socket.value.close()
    }
  }

  onUnmounted(() => {
    close()
    clearTimeout(reconnectTimer.value)
  })

  if (autoConnect) connect()

  return {
    socket,
    isConnected,
    connect,
    send,
    close,
  }
}
