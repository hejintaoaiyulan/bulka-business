// utils/uploadFile.ts
import {ref, watch} from 'vue'
import {Toast, toPromise} from '@/utils/index'
import {getToken} from "./index";
// import { BaseUrl } from '@/api/config'
import request from "../api/index";

const BaseUrl = request.config.baseUrl

const defaultOptions = {
  url: '',
  header: {},
  formData: {},
  name: 'file',
  fileType: ['image', 'video'],
  camera: 'back',
  maxSize: 15 * 1024 * 1024, // 默认10MB
  count: 9, // 默认最多选择9个文件
  sourceType: ['album', 'camera'], // 默认从相册或相机选择
  onSuccess: () => {},
  onFail: () => {}
}


export function useFileUpload(c = { showUploadLoading: false }) {
  const isUploading = ref(false)
  const uploadProgress = ref(0)

  watch(() => isUploading.value, (val) => {
    if (c?.showUploadLoading) {
      if (val) {
        uni.showLoading({
          title: '上传中'
        })
      } else {
        uni.hideLoading()
      }
    }
  })
  const uploadFile = async (options) => {
    const config = { ...defaultOptions, ...options }

    try {
      const platform = uni.getSystemInfoSync().platform
      let res

      if (platform === 'ios') {
        // iOS 兼容使用 chooseImage
        const imageRes = await toPromise(uni.chooseImage, {
          count: config.count,
          sizeType: config.sizeType,
          sourceType: config.sourceType,
        })

        // 统一结构：模拟 chooseMedia 的 res.tempFiles
        res = {
          tempFiles: imageRes.tempFiles?.length
            ? imageRes.tempFiles.map(file => ({
              tempFilePath: file.path,
              size: file.size || 0,
              fileType: 'image'
            }))
            : imageRes.tempFilePaths.map(path => ({
              tempFilePath: path,
              size: 0,
              fileType: 'image'
            }))
        }
      } else {
        // 其他平台使用 chooseMedia
        res = await toPromise(uni.chooseMedia, {
          count: config.count,
          mediaType: config.fileType,
          sourceType: config.sourceType,
          camera: config.camera,
          sizeType: config.sizeType,
        })
      }

      // 校验文件大小
      const validFiles = res.tempFiles.filter((file) => {
        if (file.size > config.maxSize) {
          Toast.info('文件大小超出限制')
          config.onFail?.(`文件大小不能超过${config.maxSize / 1024 / 1024}MB`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return Promise.reject('没有符合要求的文件')

      if (validFiles.length > config.count) {
        await uni.showToast({
          title: `最多上传${config.count}个文件`,
          icon: 'none',
        })
      }

      // 上传文件
      isUploading.value = true
      const uploadTasks = validFiles.map((file) => {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: BaseUrl + config.url,
            filePath: file.tempFilePath || file.path,
            name: config.name,
            header: {
              Authorization: uni.getStorageSync('token_type') + ' ' + getToken(),
              ...config.header,
            },
            formData: config.formData,
            success: (res) => {
              if (res.statusCode === 200) {
                const data = JSON.parse(res.data)
                config.onSuccess(data.data)
                resolve(data.data)
              } else {
                config.onFail(`上传失败: ${res.statusCode}`)
                reject(res)
              }
            },
            fail: (err) => {
              config.onFail('上传请求失败')
              reject(err)
            },
            complete: () => {
              isUploading.value = false
            },
          })
        })
      })

      return await Promise.all(uploadTasks)
    } catch (error) {
      isUploading.value = false
      return Promise.reject(error)
    }
  }

  return {
    isUploading,
    uploadProgress,
    uploadFile
  }

}
