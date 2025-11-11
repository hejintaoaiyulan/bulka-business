import {defineStore} from 'pinia'
import {getToken} from "../utils";
import {ref, computed} from "vue";
import {getUserInfo} from "../api/user";
import {getShopSetting} from "@/api/public";


export const useUserStore = defineStore('user', () => {
  // const token = ref(getToken())
  const userInfo = ref({})
  const shopConfig = ref({
    // 優惠活動商品最大添加數量
    discount_activity_max_count: 0,
    id: ''
  })
  const isLogin = () => !!getToken()
  const getInfo = () => {
    if(isVisitor.value) {
      return userInfo.value
    }
    getUserInfo().then(res => {
      showSettings()
      userInfo.value = res.data || {}
    })
  }

  const isVisitor = computed(() => {
    return userInfo.value?.is_visitor === 1
  })

  // 設置遊客模式
  const setVisitorModal = (bool) => {
    if (bool) {
      userInfo.value = {is_visitor: 1, nickname: '遊客'}
      uni.setStorageSync('is_visitor', '1')
      // uni.setStorageSync('token', 'visitor_token')
      uni.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      userInfo.value = {}
      uni.removeStorageSync('is_visitor')
    }
  }

  const logOut = () => {
    uni.removeStorageSync('token')
    userInfo.value = {}
    uni.reLaunch({
      url: '/pages/login/index'
    })
    uni.removeStorageSync('is_visitor')
    uni.$emit('closeWebSocket')
  }


  const showSettings = () => {
    getShopSetting().then(res => {
      shopConfig.value = res.data || {}
    })
  }

  return {
    userInfo, getInfo, isLogin, logOut, shopConfig,setVisitorModal, isVisitor,
  }
})
