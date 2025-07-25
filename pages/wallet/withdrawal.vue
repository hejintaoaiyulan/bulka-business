<script setup>
import {ref, watch} from "vue";
import {onLoad, onShow} from '@dcloudio/uni-app'
import {applyWithdraw, getBankCardList} from "@/api/wallet";
import {maskBankCard} from "@/utils";

const selectedRef = ref('')
const maxAmount = ref(0)
const amount = ref(0)
const showError = ref(false)
const max_withdrawal_amount = ref(0)
const backCardList = ref([])

const handleCard = (id) => {
  selectedRef.value = id
}

const handleConfirm = () => {
  if (!selectedRef.value) {
    uni.showToast({
      title: '请选择提现方式',
      icon: 'none'
    })
    return
  }
  if (!amount.value || amount.value <= 0) {
    uni.showToast({
      title: '请输入提现金额',
      icon: 'none'
    })
    return
  }
  applyWithdraw({
    bank_id: selectedRef.value,
    money: amount.value,
  }).then(res => {
    uni.navigateTo({
      url: '/pages/wallet/result?type=success'
    })
  }).catch(err => {
    uni.showToast({
      title: err.message || '提现失败',
      icon: 'none'
    })
  })

}

const handleToRecord = () => {
  uni.navigateTo({
    url: '/pages/wallet/withdrawal-record'
  })
}

const handleToCardManager = () => {
  uni.navigateTo({
    url: '/pages/wallet/bank-card'
  })
}

onLoad((query) => {
  if (query.amount) {
    maxAmount.value = +query.amount
    max_withdrawal_amount.value = +query.max_withdrawal_amount
  }
})

const handleAllAmount = () => {
  amount.value = maxAmount.value
}

const getList = () => {
  getBankCardList().then(res => {
    backCardList.value = res.data || []
    const firstCard = backCardList.value[0]
    if (firstCard) {
      selectedRef.value = firstCard.id
    }
  })
}

onShow(() => {
  getList()
})

watch(() => amount.value, (newVal) => {
  showError.value = newVal > maxAmount.value;
})

</script>

<template>
  <view class="container safe-pb">
    <uv-navbar title="提现" bg-color="#2133ff" placeholder autoBack title-style="color: white" safe-area-inset-top
               left-icon-color="#fff">
      <template #right>
        <view class="right-text" @click="handleToRecord">提现记录</view>
      </template>
    </uv-navbar>
    <view class="content">
      <view class="header">
        <view>提现金额</view>
        <view class="input-box">
          <uv-input placeholder="请输入提现金额" :max="maxAmount" v-model="amount">
            <template #prefix>
              <view class="prefix-unit">HK$</view>
            </template>
            <template #suffix>
              <view class="suffix-text" @click="handleAllAmount">
                全部提现
              </view>
            </template>
          </uv-input>
          <view v-if="showError" class="error red">提现金额大余余额</view>
        </view>
        <view class="amount-box">
          <view class="amount-number">可提现金额：HK$ {{ maxAmount }}</view>
          <view class="amount-tag">
            <view>0.3%手续费</view>
          </view>
        </view>
      </view>
      <view class="withdrawal-box">
        <view class="withdrawal-title">
          <view class="method">提现方式</view>
          <view class="cards" @click="handleToCardManager">
            我的银行卡({{ backCardList.length }}张)
          </view>
        </view>
        <uv-radio-group style="width: 100%" v-model="selectedRef">
          <view class="withdrawal-cards">
            <view class="card-item" v-for="card in backCardList" :key="card.id" @click="handleCard(card.id)">
              <view class="card-icon">
                <image src="/static/bank-card.png" style="width: 100rpx; height: 100rpx;" mode="widthFix"/>
              </view>
              <view class="card-info">
                <view class="bank-name">{{ card.bank_name }}</view>
                <view class="bank-number">{{ maskBankCard(card.bank_account) }}</view>
              </view>
              <view class="select-icon">
                <uv-radio :name="card.id"></uv-radio>
              </view>
            </view>
          </view>
        </uv-radio-group>
      </view>
      <view class="withdrawal-button">
        <view class="btn" @click="handleConfirm">确认提现</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
  background: #fff;
}

.withdrawal-button {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    color: #fff;
    background: #2133ff;
    font-size: 26rpx;
    border-radius: 50rpx;
    padding: 20rpx 0;
    width: 80%;
    text-align: center;
  }
}

.header {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  background: #fff;
}

.container {
  height: 100%;
}

.content {
  padding: 30rpx;
}

.right-text {
  font-size: 24rpx;
  color: #fff;
}

.prefix-unit {
  font-size: 26rpx;
}

.suffix-text {
  color: #007aff;
  font-size: 22rpx;
}

.amount-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20rpx;
  color: #999;

  .amount-tag {
    padding: 10rpx 20rpx;
    color: #333;
    background: #ddd;
  }
}

.withdrawal-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  font-size: 26rpx;
  margin-bottom: 20rpx;

  .cards {
    font-size: 22rpx;
    color: #007aff;
  }
}

.withdrawal-cards {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  width: 100%;

  > view {
    flex: none;
  }

  .card-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    width: 100%;
    padding: 10rpx 20rpx;
    column-gap: 20rpx;

    .card-info {
      flex: 1;
    }
  }
}

.red {
  color: #e64340;
  font-size: 20rpx;
  padding: 16rpx 0;
}
</style>