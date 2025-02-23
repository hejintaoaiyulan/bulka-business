<script setup>
import {ref} from 'vue'
const tabs = [{name: '驗證碼重置', key: 1}, {name: '舊密碼重置', key: 2}]
const tips = ref('')
const oldCode = ref()
const isCheckOldMobile = ref(false)

const currentType = ref(0)

const codeChange = (text) => {
  tips.value = text
}

const getCode = () => {
  console.log('get code')
  oldCode.value?.start()
}

const handleChangeType = (evt) => {
  console.log(evt)
  currentType.value = evt.index
}
</script>

<template>
<view class="container">
  <view v-if="!isCheckOldMobile">
    <view class="tabs">
      <uv-tabs :list="tabs" :current="currentType" @change="handleChangeType" :scrollable="false" line-color="transparent" active-style="color: #000" inactive-style="color: #999"></uv-tabs>
    </view>
    <view class="content" v-if="currentType === 0">
      <view class="old-mobile form-item">原手機號碼：130 xxxx 234</view>
      <view class="form-item">
        <uv-input placeholder="請輸入驗證碼">
          <template v-slot:suffix>
            <uv-code ref="oldCode" @change="codeChange" seconds="60" change-text="x秒後重新獲取" unique-key="oldCode"></uv-code>
            <uv-button size="mini" :text="tips" type="success" @click="getCode"></uv-button>
          </template>
        </uv-input>
      </view>
    </view>
    <view class="content" v-else>
      <view class="form-item old-mobile">輸入舊密碼</view>
      <view class="form-item">
        <uv-input placeholder="請輸入舊密碼"></uv-input>
      </view>
    </view>
    <view class="submit-button">
      <uv-button type="primary">下一步</uv-button>
    </view>
  </view>
  <view v-else>
    <view class="form">
      <view class="form-item">
        <view class="form-label">輸入新密碼</view>
        <view class="form-value">
          <uv-input placeholder="輸入新密碼" />
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">再次確認密碼</view>
        <view class="form-value">
          <uv-input placeholder="再次輸入密碼" />
        </view>
      </view>
    </view>
    <view class="submit-button button">
      <uv-button type="primary">確認</uv-button>
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.container {
  padding: 30rpx;
}
.old-mobile {
  color: #333;
  font-size: 28rpx;
}
.content {
  //padding: 30rpx;
  .form-item {
    margin-top: 40rpx;
  }
}
.submit-button {
  margin-top: 50rpx;
}
.tabs {
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid rgba(0,0,0,0.1);
}

.form {
  margin-top: 50rpx;
  .form-item {
    margin-top: 40rpx;
    .form-label {
      color: #333;
    }
    .form-value {
      width: 100%;
      margin-top: 20rpx;
    }
  }
}
</style>
