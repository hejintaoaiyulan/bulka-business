<script setup>

import {ref} from "vue";
import {Regs} from "../../globalConfig";
import {Login} from "../../api/login";

const formData = ref({
  mobile: "",
  password: ''
})

const handleToPassword = () => {
  uni.navigateTo({
    url: '/pages/login/reset-pwd'
  })
}

const handleRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  })
}

const handleLogin = () => {
  if(!Regs.mobile.test(formData.value.mobile)) {
    uni.showToast({
      title: '請輸入正確的手機號',
      icon: 'none'
    })
    return
  }
  if(!formData.value.password) {
    uni.showToast({
      title: '請輸入密碼',
      icon: 'none'
    })
    return
  }

  Login(formData.value).then(res => {
    console.log(res,'resppppp')
  })
  // uni.redirectTo({
  //   url: '/pages/index/index'
  // })
}
</script>

<template>
<view class="container">
  <view class="header">
    <text>登錄</text>
  </view>
  <view class="content">
    <view class="form">
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></view>
          <view class="label-text">賬號</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入手機號" v-model="formData.mobile"></uv-input>
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-mima"></view>
          <view class="label-text">密碼</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入密碼" type="password" v-model="formData.password"></uv-input>
        </view>
      </view>
      <view class="form-item">
        <view class="form-value flex-right">
          <view class="tips" @click="handleToPassword">忘記密碼?</view>
        </view>
      </view>

    </view>

    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff" :hairline="false" @click="handleLogin">登錄</uv-button>
      <view class="register" @click="handleRegister">去注冊</view>
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
