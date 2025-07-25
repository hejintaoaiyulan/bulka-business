<script setup>
import {ref} from 'vue'
import {getWallet, getWalletLog} from "@/api/wallet";
import {onShow, onPullDownRefresh, onReachBottom} from '@dcloudio/uni-app'
import {usePageLoading} from "@/hooks";

const walletInfo = ref({})
const {reload, dataList, loadNext} = usePageLoading(getWalletLog, {})

// 获取钱包信息
const getInfo = () => {
  getWallet().then(res => {
    walletInfo.value = res.data || {}
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
}

onShow(() => {
  getInfo()
})

const handleDetail = (record) => {
  uni.navigateTo({
    url: '/pages/wallet/detail?settled_date=' + record.settled_date + '&settled_no=' + record.settled_no + '&id=' + record.id
  })
}

const handleWithdrawal = () => {
  uni.navigateTo({
    url: '/pages/wallet/withdrawal?amount=' + walletInfo.value.balance + '&max_withdrawal_amount' + walletInfo.value.max_withdrawal_amount
  })
}

onPullDownRefresh(() => {
  getInfo()
})

onReachBottom(() => {
  // console.log('reachBottom')
  loadNext()
})

</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="card">
        <view class="card-title">
          我的余額
        </view>
        <view class="card-content">
          <view class="amount">
            <view class="price">HK$ {{ walletInfo.balance }}</view>
            <view class="withdrawal" @click="handleWithdrawal">
              <view>提现</view>
            </view>
          </view>

          <view class="price-msg">
            <view class="price-item">
              <view class="value">HK$ {{ walletInfo.unsettled }}</view>
              <view class="title">待结算金额</view>
            </view>
            <view class="price-item">
              <view class="value">HK$ {{ walletInfo.withdrawaling }}</view>
              <view class="title">提现中金额</view>
            </view>
          </view>

          <view class="price-tip">
            结算说明：订单将在完成7天后进行结算，并非实时到账
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">余額明細</view>
        <view class="card-content">
          <view class="order-list">
            <uv-empty text="暂无数据" v-if="!dataList.length"></uv-empty>
            <view v-for="item in dataList" :key="item.id" class="order-item">
              <view class="order-msg">
                <view class="order-msg-left">
                  <view>{{ item.title }}</view>
                  <view v-if="item.type === 1" class="detail" @click="handleDetail(item)">查看明细</view>
                </view>
                <view class="order-msg-right">{{ item.money }}</view>
              </view>
              <view class="order-msg">
                <view class="order-msg-left">
                  <view>结算编号：{{ item.settled_no }}</view>
                </view>
                <view class="order-msg-right">{{ item.settled_date }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.order-list {
  //margin-top: 20rpx;
  display: flex;
  flex-direction: column;

  .order-item {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #eee;
  }

  .order-msg {
    display: flex;
    justify-content: space-between;
    line-height: 50rpx;
    font-size: 26rpx;
    color: #333;
  }

  .order-msg-left {
    display: flex;
    column-gap: 10rpx;

    .detail {
      color: #007aff;
      font-size: 24rpx;
    }

    align-items: center;
  }
}

.amount {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .withdrawal {
    background-color: #000;
    padding: 10rpx 20rpx;
    border-radius: 5rpx;
    color: #fff;
    font-size: 26rpx;
  }
}

.container {
  height: 100%;
  background: #f8f8f8;
  padding: 20rpx;
}


.card {
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  margin-bottom: 20rpx;

  .card-title {
    font-size: 30rpx;
    color: #333;
    line-height: 60rpx;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
}

.price-msg {
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  line-height: 50rpx;
  font-size: 26rpx;
  margin: 30rpx 0;
}

.price-tip {
  color: #999;
  font-size: 24rpx;
}
</style>