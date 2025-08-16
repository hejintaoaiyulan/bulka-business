<script setup>
import {
  useFileUpload
} from '../../utils/uploadFile';
import {
  sendFeedback,
  UploadUrl
} from "@/api/public";
import {
  ref, unref,
  watch
} from "vue";
import {showModal} from "@/utils";
import {omit} from "lodash";

const {
  uploadFile,
  isUploading
} = useFileUpload()

watch(() => isUploading.value, (val) => {
  if (val) {
    uni.showLoading({
      title: '上傳中'
    })
  } else {
    uni.hideLoading()
  }
})

const formData = ref({
  images: [],
  showImages: [],
  content: "",
  mobile: ""
})

const handleUpload = async () => {
  uploadFile({
    name: 'image',
    count: 4 - formData.value.images.length,
    url: UploadUrl
  }).then(res => {
    formData.value.images = formData.value.images.concat(res.map(item => item.path))
    formData.value.showImages = formData.value.showImages.concat(res.map(item => item.url))
    console.log(res)
  })
}

// 刪除圖片
const handleRemove = (file, index) => {
  showModal('確定刪除該圖片嗎?').then(() => {
    formData.value.images.splice(index, 1)
    formData.value.showImages.splice(index, 1)
  }).catch(() => {
  })
}

// 提交
const handleSubmit = () => {
  if(!formData.value.content) {
    return uni.showToast({
      title: '請填寫問題和意見',
      icon: 'none'
    })
  }
  if(!formData.value.mobile) {
    return uni.showToast({
      title: '請填寫聯繫方式',
      icon: 'none'
    })
  }
  sendFeedback(omit({...unref(formData)}, ['showImages'])).then(res => {
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
      })
    }, 1000)
  }).catch((err) => {
    uni.showToast({
      title: err.msg || '提交失敗，請稍後再試',
      icon: 'none'
    })
  })
}
</script>

<template>
  <view class="feedback-content form">
    <view class="form-item">
      <view class="form-label">
        <view>問題和意見</view>
        <view class="extra">{{formData.content.length}}/200</view>
      </view>
      <view class="form-value">
        <textarea maxlength="200" v-model="formData.content" placeholder="請填寫10個字以上的問題描述以便我們提供更好的幫助"></textarea>
      </view>
    </view>

    <view class="form-item">
      <view class="form-label">
        <view>圖片（選填，提供問題截圖）</view>
        <view class="extra">{{formData.images.length}}/4</view>
      </view>
      <view class="form-value">
        <view class="pic-list">
          <view class="pic-item" v-for="(pic, i) in formData.showImages" :key="i" @longpress="handleRemove(pic, i)">
            <image :src="pic" mode="aspectFill"></image>
          </view>
          <view v-if="formData.images.length < 4" class="pic-item add-icon" @click="handleUpload">
            <uv-icon name="plus" color="#999" size="30"/>
          </view>
        </view>
      </view>
    </view>
    <view class="form-item">
      <view class="form-label">
        <view>聯繫方式（選填）</view>
      </view>
      <view class="form-value">
        <input v-model="formData.mobile" placeholder="手機號碼，用於與你聯繫"/>
      </view>
    </view>

    <view class="submit">
      <uv-button type="primary" @click="handleSubmit">提交</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
  background: #ededed;
}

.submit {
  margin-top: 50rpx;
}

.form {
  height: 100%;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  row-gap: 30rpx;
}

.form-label {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 20rpx;
  color: #333;
  font-size: 28rpx;
}

.form-value {
  border-radius: 16rpx;
  background: #fff;
  padding: 20rpx;
  color: #555;
  font-size: 26rpx;
}

.pic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;

  .pic-item {
    width: 160rpx;
    height: 160rpx;
    background: #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
