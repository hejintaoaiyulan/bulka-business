<script setup>
import {ref} from 'vue'
import {getSMSCode} from "../../api/public";
import {Register} from "../../api/login";
import {Regs} from "../../globalConfig";
import {Toast, setToken} from "../../utils";

const tips = ref('')
const oldCode = ref()
// const isCheckOldMobile = ref(false)
const formData = ref({
  prefix: '86',
  mobile: '',
  code: '',
  password: ''
})

const codeChange = (text) => {
  tips.value = text
}

const getCode = () => {
  console.log('get code')
  if(oldCode.value.canGetCode)
  getSMSCode({mobile: formData.value.mobile, prefix: formData.value.prefix, type: 'register'}).then(res => {
    console.log(res, 'res')
    oldCode.value?.start()
    Toast.success('驗證碼已發送')
  })
}

const checkFormData = () => {
  if (!Regs.mobile.test(formData.value.mobile)) {
    Toast.info('請輸入正確的手機號')
    return false
  }
  if (!formData.value.code) {
    Toast.info('請輸入驗證碼')
    return false
  }
  if (!formData.value.password) {
    Toast.info('請輸入密碼')
    return false
  }
  return true
}



const handleToSetInfo = () => {
  const check = checkFormData()
  if (!check) return
  Register({...formData.value, prefix: formData.value.prefix}).then(res => {
    const {access_token, check_status, token_type , expires_in} = res.data || {}
    setToken(access_token, expires_in)
    uni.setStorageSync('token_type', token_type)
    if(check_status !== 4) {
      uni.navigateTo({
        url: '/pages/register/set-info'
      })
    }else if(check_status) {
      uni.navigateTo({
        url: '/pages/login/index'
      })
    }
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
            <view class="label-text">短信驗證碼</view>
          </view>
          <view class="form-value">
            <uv-input placeholder="請輸入驗證碼" v-model="formData.code">
              <template v-slot:suffix>
                <uv-code seconds="60" @change="codeChange" change-text="x秒後重新獲取" ref="oldCode"></uv-code>
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
            <uv-input placeholder="請輸入密碼" type="password" v-model="formData.password"></uv-input>
          </view>
        </view>
      </view>

      <view class="submit-button">
        <uv-button custom-style="background: black; color: #fff" :hairline="false" @click="handleToSetInfo">下一步
        </uv-button>
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
