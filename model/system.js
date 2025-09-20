import {defineStore} from 'pinia'
import {ref} from "vue";
import {getSystemPublicConfig} from "@/api/public";

export const useSystemConfig = defineStore('system', () => {
  const systemConfig = ref({})

  const getSystemConfig = async () => {
    const res = await getSystemPublicConfig()
    systemConfig.value = res.data || {}
    getAppUpdateInfo()
    return systemConfig.value
  }

  const getAppUpdateInfo = () => {
    // 要檢查更新狀態，安卓要下載，ios另外處理 systemConfig 中包含版本信息 app_version - 當前app最新版本 is_update - 是否強制更新 ios_update_url - 更新地址 android_update_url - 安卓更新地址
    if (systemConfig.value.is_update) {
      uni.getSystemInfo({
        success: (info) => {
          if (info.platform === 'ios') {
            uni.showModal({
              title: '更新提示',
              content: '有新版本了，是否前往更新？',
              confirmText: '去更新',
              cancelText: '暫不更新',
              success: (res) => {
                if (res.confirm) {
                  // #ifdef APP-PLUS
                  plus.runtime.openURL(systemConfig.value.ios_update_url);
                  // #endif
                }
              }
            })
          } else if (info.platform === 'android') {
            uni.showModal({
              title: '更新提示',
              content: '有新版本了，是否前往更新？',
              confirmText: '去更新',
              cancelText: '暫不更新',
              success: (res) => {
                if (res.confirm) {
                  uni.downloadFile({
                    url: systemConfig.value.android_update_url,
                    success: (downloadRes) => {
                      if (downloadRes.statusCode === 200) {
                        // #ifdef APP-PLUS
                        plus.runtime.install(
                          downloadRes.tempFilePath,
                          { force: true },
                          () => {
                            console.log('安裝成功');
                          },
                          (err) => {
                            console.error('安裝失敗：' + JSON.stringify(err));
                          }
                        );
                        //#endif
                      } else {
                        uni.showToast({
                          title: '下載失敗，請稍後重試',
                          icon: 'none'
                        })
                      }
                    },
                    fail: (err) => {
                      console.error('下載失敗', err)
                      uni.showToast({
                        title: '下載失敗，請稍後重試',
                        icon: 'none'
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }

  return {
    systemConfig, getSystemConfig
  }
})
