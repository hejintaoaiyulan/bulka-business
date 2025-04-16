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
  maxSize: 45 * 1024 * 1024, // 默认15MB
  count: 9, // 默认最多选择9个文件
  sourceType: ['album', 'camera'], // 默认从相册或相机选择
  onSuccess: () => {},
  onFail: () => {}
}


export function useFileUpload(c = { showUploadLoading: false }) {
  const isUploading = ref(false)
  const uploadProgress = ref(0)

  watch(()=> isUploading.value, (val)=> {
    if(c?.showUploadLoading) {
      if(val) {
        uni.showLoading({
          title: '上传中'
        })
      }else {
        uni.hideLoading()
      }
    }
  })

  // 核心上传方法
  const uploadFile = async (
    options
  ) => {
    const config = {...defaultOptions, ...options}

    try {
      // 1. 选择文件
      const res = await toPromise(uni.chooseMedia || uni.chooseImage, {
        count: config.count,
        mediaType: config.fileType,
        sourceType: config.sourceType,
        camera: config.camera,
        sizeType: config.sizeType
      })
      // 2. 校验文件
      const validFiles = res.tempFiles.filter((file) => {
        if (file.size > config.maxSize) {
          Toast.info('文件大小超出限制')
          config.onFail?.(`文件大小不能超过${config.maxSize / 1024 / 1024}MB`)
          return false
        }
        return true
      })

      if (validFiles.length === 0) return Promise.reject('没有符合要求的文件')
      if (validFiles.length > config.count)
        await uni.showToast({
          title: `最多上传${config.count}个文件`,
          icon: 'none'
        })

      // 3. 执行上传
      isUploading.value = true
      const uploadTasks = validFiles.map((file) => {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: BaseUrl + config.url,
            filePath: file.tempFilePath || file.path,
            name: config.name,
            header: {
              Authorization: uni.getStorageSync('token_type') + ' ' + getToken(), // 示例token
              ...config.header
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
            fail: err => {
              config.onFail('上传请求失败')
              reject(err)
            },
            complete: () => {
              isUploading.value = false
            }
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
