<script setup>
import { ref } from 'vue'
import {useUserStore} from "../../model/user";
import {getSMSCode, verifySms} from "../../api/public";
import {Toast} from "../../utils";
import UvInput from "../../uni_modules/uv-input/components/uv-input/uv-input.vue";

const tips = ref('')
const oldCode = ref()
const newCode = ref()
const isCheckOldMobile = ref(false)
const userStore = useUserStore()

const oldMobileSmsCode = ref('')

const formData = ref({})

const codeChange = (text) => {
  tips.value = text
}
const getCode = () => {
  console.log('get code')
  getSMSCode({prefix: userStore.userInfo.prefix, mobile: userStore.userInfo.mobile, type: 'oldmobile'}).then(res => {
    oldCode.value?.start()
    Toast.success('驗證碼已發送')
  })
}

const getNewCode = () => {
  newCode.value?.start()
}

const handleNext = () => {
  if(!oldMobileSmsCode.value){
    return Toast.info('請輸入驗證碼')
  }
  verifySms({
    prefix: userStore.userInfo.prefix,
    mobile: userStore.userInfo.mobile,
    type: 'oldmobile',
    code: oldMobileSmsCode.value,
  }).then(() => {
    isCheckOldMobile.value = true
  })
}

const handleBindMobile = () => {

}
</script>

<template>
  <view class="container">
    <view class="form" v-if="!isCheckOldMobile">
      <view class="old-phone">
        原手機號：{{userStore.userInfo.mobile}}
      </view>
      <view class="form-item">
        <uv-input placeholder="請輸入驗證碼" v-model="oldMobileSmsCode">
          <template v-slot:suffix>
            <uv-code ref="oldCode" @change="codeChange" seconds="60" change-text="x秒後重新獲取" unique-key="oldCode"></uv-code>
            <uv-button size="mini" :text="tips" type="success" @click="getCode"></uv-button>
          </template>
        </uv-input>

      </view>
      <view class="submit-button">
        <uv-button type="primary" @click="handleNext">下一步</uv-button>
      </view>
    </view>
    <view v-else class="form">
      <view class="form-item">新手機號綁定</view>
      <view class="form-item" style="display: flex; column-gap: 10rpx; align-items: center;">
        <uv-input placeholder="請輸入區號" v-model="formData.prefix" custom-style="width: 150rpx; flex: none">
          <template v-slot:prefix>
            <uv-text
                text="+"
                margin="0 3px 0 0"
                type="tips"
            ></uv-text>
          </template>
        </uv-input>
        <uv-input placeholder="請輸入新手機號" v-model="formData.mobile"></uv-input>
      </view>
      <view class="form-item">
        <uv-input placeholder="請輸入驗證碼" v-model="formData.code">
          <template v-slot:suffix>
            <uv-code ref="newCode" @change="codeChange" seconds="60" change-text="x秒後重新獲取" unique-key="newCode"></uv-code>
            <uv-button size="mini" :text="tips" type="success" @click="getNewCode"></uv-button>
          </template>
        </uv-input>
      </view>
      <view class="submit-button">
        <uv-button type="primary" @click="handleBindMobile">確認綁定</uv-button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.form {
  padding: 30rpx;
  margin-top: 50rpx;
}
.form-item {
  margin-top: 40rpx;
}
.old-phone {
  //margin-bottom: 40rpx;
  color: #333;
}

.submit-button {
  margin-top: 50rpx;
}
</style>
