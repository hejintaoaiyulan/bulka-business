<script setup>

import {ref} from "vue";
import {Regs} from "../../globalConfig";
import {Login} from "../../api/login";
import {getShopCheck} from "../../api/public";
import {setToken} from "../../utils";

const formData = ref({
  mobile: "",
  password: '',
  prefix: '86'
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
  if (!Regs.mobile.test(formData.value.mobile)) {
    uni.showToast({
      title: '請輸入正確的手機號',
      icon: 'none'
    })
    return
  }
  if (!formData.value.password) {
    uni.showToast({
      title: '請輸入密碼',
      icon: 'none'
    })
    return
  }

  Login({...formData.value, prefix: `+${formData.value.prefix}`}).then(async res => {
    const {access_token, check_status, token_type, expires_in} = res.data || {}
    setToken(access_token, expires_in)
    uni.setStorageSync('token_type', token_type)
    if (check_status !== 4) {
      uni.navigateTo({
        url: '/pages/register/set-info'
      })
    } else if (check_status) {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  }).catch(err => {
    console.log(err)
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
          <view class="form-value" style="display: flex; column-gap: 10rpx; align-items: center;">
            <uv-input placeholder="請輸入區號" v-model="formData.prefix" custom-style="width: 150rpx; flex: none">
              <template v-slot:prefix>
                <uv-text
                    text="+"
                    margin="0 3px 0 0"
                    type="tips"
                ></uv-text>
              </template>
            </uv-input>
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

.tips {
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
