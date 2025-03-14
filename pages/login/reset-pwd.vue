<script setup>
import { ref } from 'vue'
import {getSMSCode, verifySms} from "../../api/public";
import {setToken, Toast} from "../../utils";
import {Regs} from "../../globalConfig";
import UvInput from "../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import {forgetPwd} from "../../api/user";

const tips = ref('')
const oldCode = ref()
const isCheckOldMobile = ref(false)

const formData = ref({
  mobile: '',
  prefix: '86'
})

const codeChange = (text) => {
  tips.value = text
}

const getCode = () => {
  console.log('get code')
  if(!formData.value.prefix) {
    return Toast.info('請輸入區號')
  }
  if(!formData.value.mobile) {
    return Toast.info('請輸入手機號')
  }
  if(!Regs.mobile.test(formData.value.mobile)) {
    return Toast.info('請輸入正確的手機號')
  }
  getSMSCode({mobile: formData.value.mobile, prefix: `+${formData.value.prefix}`, type: 'forget'}).then(res => {
    Toast.success('驗證碼已發送')
    oldCode.value?.start()
  })
}

const handleNext = () => {
  verifySms({
    ...formData.value,
    type: 'forget'
  }).then((res) => {
    isCheckOldMobile.value = true
    formData.value.verify_code = res.data.verify_code
  })
}

const handleSubmit = () => {
  if(!formData.value.password) {
    return Toast.info('請輸入密碼')
  }
  if(formData.value.password !== formData.value.re_password) {
    return Toast.info('兩次密碼不一致')
  }
  forgetPwd({password: formData.value.password, verify_code: formData.value.verify_code}).then(res => {
    Toast.success('修改密碼成功')
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
  })
}
</script>

<template>
<view class="container">
  <view class="content" v-if="!isCheckOldMobile">
    <view class="form">
      <view class="form-item">
        <view class="form-label">
          <view class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></view>
          <view class="label-text">手機號碼</view>
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
              <uv-code seconds="60" @change="codeChange" change-text="x秒後重新獲取"></uv-code>
              <uv-button size="mini" :text="tips" type="success" @click="getCode"></uv-button>
            </template>
          </uv-input>
        </view>
      </view>

    </view >

    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff" :hairline="false" @click="handleNext">下一步</uv-button>
    </view>
  </view>
  <view class="content" v-else>
    <view class="form">
      <view class="form-item">
        <view class="form-label">
<!--          <view class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></view>-->
          <view class="label-text">輸入新密碼</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請輸入新密碼" type="password" v-model="formData.password"></uv-input>
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">
<!--          <view class="iconfont icon-mima"></view>-->
          <view class="label-text">再次確認密碼</view>
        </view>
        <view class="form-value">
          <uv-input placeholder="請再次輸入密碼" type="password" v-model="formData.re_password"></uv-input>
        </view>
      </view>

    </view >

    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff" :hairline="false" @click="handleSubmit">提交</uv-button>
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
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
