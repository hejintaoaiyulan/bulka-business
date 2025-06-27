import {defineStore} from 'pinia'
import {getToken} from "../utils";
import {ref, computed} from "vue";
import {getUserInfo} from "../api/user";
import {getShopSetting} from "@/api/public";


export const useUserStore = defineStore('user', () => {
  // const token = ref(getToken())
  const userInfo = ref({})
  const shopConfig = ref({
    // 优惠活动商品最大添加数量
    discount_activity_max_count: 0,
    id: ''
  })
  const isLogin = () => !!getToken()
  const getInfo = () => {
    getUserInfo().then(res => {
      showSettings()
      userInfo.value = res.data || {}
    })
  }

  const logOut = () => {
    uni.removeStorageSync('token')
    userInfo.value = {}
    uni.reLaunch({
      url: '/pages/login/index'
    })
  }

  const showSettings = () => {
    getShopSetting().then(res => {
      shopConfig.value = res.data || {}
    })
  }

  return {
    userInfo, getInfo, isLogin, logOut, shopConfig
  }
})