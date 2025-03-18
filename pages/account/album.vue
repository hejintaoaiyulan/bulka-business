<script setup>
import {computed, ref, unref} from "vue";
import {onLoad} from '@dcloudio/uni-app'
import {useFileUpload} from "../../utils/uploadFile";
import {UploadUrl} from "../../api/public";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";

const {uploadFile} = useFileUpload({
  showUploadLoading: true
})

const urls = ref([])

let option = {}
onLoad((query) => {
  option = query
  const images = uni.getStorageSync('storeImages') || []
  urls.value = images || []
})

const handlePreviewImage = (index) => {
  uni.previewImage({
    urls,
    current: index
  })
}


const handleAddImage = () => {
  uploadFile({
    count: 9,
    name: 'image',
    url: UploadUrl,
    fileType: ['image']
  }).then(res => {
    urls.value.push(...res.map(item => item.url))
    uni.$emit('store-images', unref(urls))
  })
}

const viewUrls = computed(() => {
  return urls.value.filter(Boolean).map(url => {
    if(url.indexOf('http')) {
      return url
    }
    return option.base_url + url
  })
})

const handleBack = () => {
  uni.navigateBack()
}

const handleRemove = (url, index) => {
  uni.showModal({
    title: '提示',
    content: '確定刪除此圖片嗎?',
    success: (res) => {
      if(res.confirm) {
        urls.value.splice(index, 1)
        uni.$emit('store-images', unref(urls))
      }
    }
  })
}
</script>

<template>
<view class="container">
  <uv-navbar
      title="商家相冊"
      fixed
      bg-color="#000000"
      title-style="color: #fff"
      :safeAreaInsetTop="true"
      placeholder
      @left-click="handleBack"
      left-icon-color="#fff"
  >
    <template #right>
      <text class="add-icon iconfont icon-jiahao" @click="handleAddImage"></text>
    </template>
  </uv-navbar>
  <view class="image-content safe-pb">
    <view class="empty" v-if="!viewUrls.length">暫無相片</view>
    <view class="image-item" v-for="(url , index) in viewUrls" :key="index" @click="handlePreviewImage(index)">
      <view class="remove-icon flex-center" @click.stop="handleRemove(url)">
        <text class="iconfont icon-jianhao"></text>
      </view>
      <image mode="widthFix" :src="url" style="width: 100%; height: 100rpx" />
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.empty {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #999;
  width: 100%;
}
.container {
  padding: 20rpx;
}
.image-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20rpx;
  padding: 20rpx;
  .image-item {
    width: 48%;
    border-radius: 10rpx;
    //overflow: hidden;
    position: relative;
  }
}
.add-icon {
  color: #fff;
}

.remove-icon {
  position: absolute;
  right: -20rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 10rpx;
  display: flex;
  background-color: #df6867;
  top: -20rpx;
  z-index: 10;
  color: #fff;
}
</style>
