<script setup>
import { ref } from 'vue'

const tips = ref('')
const oldCode = ref()
const isCheckOldMobile = ref(false)

const codeChange = (text) => {
  tips.value = text
}

const getCode = () => {
  console.log('get code')
  oldCode.value?.start()
}

const handleToSetInfo = () => {
  uni.navigateTo({
    url: '/pages/register/set-info'
  })
}
</script>

<template>
<view class="container">
  <view class="header">
    <text>正在註冊</text>
  </view>
  <view class="content">
    <view class="form">
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></view>
          <view class="label-text">手機號</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入手機號"></uv-input>
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-mima"></view>
          <view class="label-text">短信驗證碼</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入驗證碼">
            <template v-slot:suffix>
              <uv-code seconds="60" @change="codeChange" change-text="x秒後重新獲取"></uv-code>
              <uv-button size="mini" :text="tips" type="success" @click="getCode"></uv-button>
            </template>
          </uv-input>
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-mima"></view>
          <view class="label-text">設置密碼</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入密碼" type="password"></uv-input>
        </view>
      </view>
    </view>

    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff" :hairline="false" @click="handleToSetInfo">下一步</uv-button>
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.header {
  background-color: #000;
  color: #fff;
  font-size: 60rpx;
  font-weight: bold;
  padding: 30rpx;
  padding-bottom: 50rpx;
  text-align: center;
}
.content {
  background-color: #fff;
  padding: 30rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-top: -20rpx;
}

.form {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  margin-top: 30rpx;
  .form-item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30rpx;
    .form-label {
      .iconfont {
        font-size: 50rpx;
        color: #000;
      }
      display: flex;
      margin-bottom: 20rpx;
      align-items: center;
      column-gap: 10rpx;
      font-size: 30rpx;
      color: #999;
    }
  }

}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  margin-top: 60rpx;
}

.tips{
  color: #999;
  font-size: 24rpx;
}

.register {
  margin-top: 20rpx;
  color: #000;
  font-size: 28rpx;
  text-align: center;
}
</style>
