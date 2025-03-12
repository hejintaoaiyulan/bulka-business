import {ref} from 'vue'

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
 *     requestParams?: Record<any, any>}} options
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
      if(replace) {
        (response.data[keyName] || []).forEach(newItem => {
          dataList.value = dataList.value.map(item => {
            if(newItem.id === item.id) {
              return {...item, ...newItem}
            }
            return item
          })
        })

      }else {
        dataList.value = dataList.value.concat(response.data[keyName])
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
    return getData({...(data || {}), ...loadDataParams})
  }

  const loadNext = () => {
    if (loading.value || !hasMore.value) return console.log('load-next page padding')
    pageParams.value.page++
    return getData(loadDataParams)
  }

  const delItem = (id) => {
    dataList.value = dataList.value.filter(item => item.id !== id)
  }

  return {
    loadNext,
    loading,
    getData,
    reload,
    delItem,
    dataList,
    pageParams
  }
}
