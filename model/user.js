import { defineStore } from 'pinia'
import {getToken} from "../utils";
import {ref, computed} from "vue";
import {getUserInfo} from "../api/user";


export const useUserStore = defineStore('user', () => {
    const token = ref(getToken())
    const userInfo = ref({})
    const isLogin = computed(() => !!token.value)
    const getInfo = () => {
        getUserInfo().then(res => {
            userInfo.value = res.data || {}
        })
    }

    return {
        userInfo, getInfo, isLogin
    }
})