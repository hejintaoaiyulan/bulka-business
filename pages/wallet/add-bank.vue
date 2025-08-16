<script setup>
import {ref, computed} from 'vue'
import {BankMap} from "@/utils/fields";
import {Toast} from "@/utils";
import {addBankCard} from "@/api/wallet";

const formData = ref({
  bank_name: '',
  user_name: '',
  bank_account: ''
})

const handleBind = () => {
  if (!formData.value.bank_name) {
    return Toast.info('請選擇銀行')
  }
  if (!formData.value.user_name) {
    return Toast.info('請輸入賬戶持有者')
  }
  if (!formData.value.bank_account) {
    return Toast.info('請輸入賬號號碼')
  }
  addBankCard(formData.value).then(() => {
    Toast.success('綁定成功')
    uni.redirectTo({
      url: '/pages/wallet/bind-result'
    })
  }).catch(err => {
    Toast.fail(err.message || '綁定失敗')
  })
}

// 銀行名稱列表
const banks = computed(() => {
  return Array.from(BankMap.keys())
})

// 選擇了銀行
const handleSetBank = (evt) => {
  const index = evt.detail.value
  formData.value.bank_name = banks.value[index]
}
</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="form">
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>所屬銀行</text>
          </view>
          <picker mode="selector" :range="banks" @change="handleSetBank">
            <view class="form-value">
              <text v-if="!formData.bank_name" class="value empty">請選擇銀行</text>
              <text v-else class="value">{{ formData.bank_name }}</text>
            </view>
          </picker>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>賬戶持有者</text>
          </view>
          <view class="form-value">
            <uv-input v-model="formData.user_name" border="none" font-size="24rpx" input-align="right"
                      placeholder="請輸入賬戶持有者"/>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>賬號號碼</text>
          </view>
          <view class="form-value">
            <uv-input v-model="formData.bank_account" border="none" font-size="24rpx" input-align="right"
                      placeholder="請輸入賬號號碼"/>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="confirm-button">
        <view class="btn" @click="handleBind">確認綁定</view>
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
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 30rpx 30rpx 0;
  font-size: 24rpx;
}

.form-value .empty {
  color: #888;
}

.footer {
  flex: none;
}

.red {
  color: #e64340;
}

.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    width: 80%;
    padding: 20rpx 30rpx;
    background-color: #007aff;
    text-align: center;
    color: #fff;
    font-size: 26rpx;
    border-radius: 10rpx;
  }
}

.form-item {
  line-height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>