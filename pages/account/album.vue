<script setup>
import {computed} from "vue";

const urls = [
  '/static/image/img-6.png',
  '/static/image/img-6.png',
  '/static/image/img-6.png',
  '/static/image/img-6.png',
  '/static/image/img-6.png',
  '/static/image/img-6.png'
]

const handlePreviewImage = (index) => {
  uni.previewImage({
    urls,
    current: index
  })
}
</script>

<template>
<view class="container">
  <view class="image-content safe-pb">
    <view class="image-item" v-for="(url , index) in urls" :key="index" @click="handlePreviewImage(index)">
      <image mode="widthFix" :src="url" style="width: 100%; height: 50rpx" />
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.container {
  padding: 20rpx;
}
.image-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20rpx;
  .image-item {
    width: 48%;
    border-radius: 10rpx;
    overflow: hidden;
  }
}
</style>
