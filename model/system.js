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
    // 要检查更新状态，安卓要下载，ios另外处理 systemConfig 中包含版本信息 app_version - 当前app最新版本 is_update - 是否强制更新 ios_update_url - 更新地址 android_update_url - 安卓更新地址
    if (systemConfig.value.is_update) {
      uni.getSystemInfo({
        success: (info) => {
          if (info.platform === 'ios') {
            uni.showModal({
              title: '更新提示',
              content: '有新版本了，是否前往更新？',
              confirmText: '去更新',
              cancelText: '暂不更新',
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
              cancelText: '暂不更新',
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
                            console.log('安装成功');
                          },
                          (err) => {
                            console.error('安装失败：' + JSON.stringify(err));
                          }
                        );
                        //#endif
                      } else {
                        uni.showToast({
                          title: '下载失败，请稍后重试',
                          icon: 'none'
                        })
                      }
                    },
                    fail: (err) => {
                      console.error('下载失败', err)
                      uni.showToast({
                        title: '下载失败，请稍后重试',
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
