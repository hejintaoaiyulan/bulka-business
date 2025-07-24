<script setup>

</script>

<template>
  <view class="container">
    <view class="result">
      <view>
        <image src="/static/pass.png" style="width: 180rpx;height: 100rpx;" mode="widthFix"/>
      </view>
      <view>绑定成功</view>
      <view class="bind-btn">
        <view class="btn" @click="uni.navigateBack()">我知道了</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result {
  width: 70vw;
  height: 70vh;
  display: flex;
  align-items: center;
  //justify-content: center;
  flex-direction: column;
  row-gap: 20rpx;
}
.bind-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .btn {
    padding: 20rpx 0;
    width: 80%;
    text-align: center;
    border-radius: 10rpx;
    font-size: 24rpx;
    margin-top: 30rpx;
    background: #007aff;
    color: #fff;
  }
}
</style>