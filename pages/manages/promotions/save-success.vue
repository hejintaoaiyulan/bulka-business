<script setup>

import UvButton from "../../../uni_modules/uv-button/components/uv-button/uv-button.vue";

const handleBack = () => {
  uni.navigateBack({})
}
</script>

<template>
<view class="container">
  <view class="success-content">
    <image src="/static/pass.png" style="width: 40%; height: 100rpx" mode="widthFix" />
    <view class="tips">已上传成功</view>
  </view>
  <view class="home-button">
    <uv-button class="operation-item" @click="handleBack">返回首页</uv-button>
  </view>
</view>
</template>

<style scoped lang="scss">
.success-content {
  margin-top: 40rpx;
  text-align: center;
  padding: 30rpx;
}
.tips {
  margin: 20rpx 0;
}
.home-button {
  margin-top: 60rpx;
  padding: 30rpx;
}
.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>