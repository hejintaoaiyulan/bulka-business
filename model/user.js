import {defineStore} from 'pinia'
import {getToken} from "../utils";
import {ref, computed} from "vue";
import {getUserInfo} from "../api/user";


export const useUserStore = defineStore('user', () => {
  // const token = ref(getToken())
  const userInfo = ref({})
  const isLogin = () => !!getToken()
  const getInfo = () => {
    getUserInfo().then(res => {
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

  return {
    userInfo, getInfo, isLogin, logOut
  }
})