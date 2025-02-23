<script setup>
import { ref } from 'vue'

const tips = ref('')
const oldCode = ref()
const newCode = ref()
const isCheckOldMobile = ref(false)

const codeChange = (text) => {
  tips.value = text
}
const getCode = () => {
  console.log('get code')
  oldCode.value?.start()
}

const getNewCode = () => {
  newCode.value?.start()
}
</script>

<template>
  <view class="container">
    <view class="form" v-if="!isCheckOldMobile">
      <view class="old-phone">
        原手機號：130xxxx1234
      </view>
      <view class="form-item">
        <uv-input placeholder="請輸入驗證碼">
          <template v-slot:suffix>
            <uv-code ref="oldCode" @change="codeChange" seconds="60" change-text="x秒後重新獲取" unique-key="oldCode"></uv-code>
            <uv-button size="mini" :text="tips" type="success" @click="getCode"></uv-button>
          </template>
        </uv-input>

      </view>
      <view class="submit-button">
        <uv-button type="primary">下一步</uv-button>
      </view>
    </view>
    <view v-else class="form">
      <view class="form-item">新手機號綁定</view>
      <view class="form-item">
        <uv-input placeholder="請輸入新手機號"></uv-input>
      </view>
      <view class="form-item">
        <uv-input placeholder="請輸入驗證碼">
          <template v-slot:suffix>
            <uv-code ref="newCode" @change="codeChange" seconds="60" change-text="x秒後重新獲取" unique-key="newCode"></uv-code>
            <uv-button size="mini" :text="tips" type="success" @click="getNewCode"></uv-button>
          </template>
        </uv-input>
      </view>
      <view class="submit-button">
        <uv-button type="primary">確認綁定</uv-button>
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
