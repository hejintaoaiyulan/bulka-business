<script setup>

</script>

<template>
  <view class="container">
    <view class="result">
      <view class="result-icon">
        <image src="/static/pass.png" style="width: 200rpx" mode="widthFix"></image>
      </view>
      <view class="result-title">提交成功</view>
      <view class="result-text">您的提現申請已提交，工作人員將在1-3個工作日內審核，請耐心等待</view>
      <view class="result-btn" @click="uni.navigateBack()">我知道了</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20rpx;
  width: 70%;
  color: #666;
  font-size: 26rpx;
  margin-top: 100rpx;
  text-align: center;
  height: 60vh;
}
.result-btn {
  padding: 10rpx 30rpx;
  color: #fff;
  border-radius: 10rpx;
  text-align: center;
  background: #000;
  margin-top: 30rpx;
}
</style>