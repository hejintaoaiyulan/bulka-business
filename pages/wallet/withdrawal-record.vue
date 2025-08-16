<script setup>

import {ref, computed} from "vue";
import dayjs from "dayjs";
import {usePageLoading} from "@/hooks";
import {getWallet, getWithdrawList} from "@/api/wallet";
import {onShow} from '@dcloudio/uni-app'

const walletInfo = ref({})

const {reload, dataList, loadNext} = usePageLoading(getWithdrawList, {})

const date = ref(dayjs());
const dateStr = computed(() => {
  return date.value.format('YYYY-MM')
})
const handleInfo = (record) => {
  console.log(record)
  uni.showModal({
    title: '提現失敗原因',
    content: record.reason || '請檢查您的銀行卡信息是否正確，或聯繫客服處理。',
    showCancel: false,
    confirmText: '知道了'
  })
}

// 處理日期選擇
const handleChangeDate = (evt) => {
  const value = evt.detail.value;
  const day = dayjs(value);
  if(day.isSame(date.value,'d')) return
  // 可以在這裡觸發數據重新加載
  // console.log('選擇的日期:', date.value.format('YYYY-MM'));
  if(day.isAfter(dayjs(), 'd')) {
    uni.showToast({
      title: '不能選擇未來的日期',
      icon: 'none'
    });
    return;
  }
  date.value = day;
  getList()
}

// 獲取錢包信息
const getInfo = () => {
  getWallet().then(res => {
    walletInfo.value = res.data || {}
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
}

const getList = () => {
  reload({
    date: dateStr.value,
  })
}

onShow(() => {
  getInfo()
  getList()
})
</script>

<template>
  <view class="container safe-pb">
    <view class="header">
      <view>累計提現(HK$)</view>
      <view class="price">{{walletInfo.withdrawaled}}</view>
      <view class="tip-total">提現中：{{walletInfo.withdrawaling}}HK$</view>
    </view>
    <view class="record-list">
      <view class="record-filter">
        <view class="type">
          <text>全部</text>
          <text class="iconfont icon-arrow-right-copy"></text>
        </view>
        <picker mode="date" fields="month" @change="handleChangeDate">
          <view class="time">
            <text>{{dateStr}}</text>
            <text class="iconfont icon-arrow-right-copy"></text>
          </view>
        </picker>
      </view>

      <view class="records-content">
        <uv-empty v-if="!dataList.length" />
        <view class="record-item" v-for="record in dataList" :key="record.id">
          <view class="record-msg">
            <view class="record-type">
              <text>{{record.status_txt}}</text>
              <text v-if="record.status === 3" class="red tip" @click="handleInfo(record)">查看原因</text>
            </view>
            <view class="record-price">{{record.money}}</view>
          </view>
          <view class="record-msg">
            <view class="record-order">訂單號：{{record.withdrawal_no}}</view>
            <view class="record-time">{{record.approval_time}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.records-content {
  display: flex;
  flex-direction: column;
}

.record-item {
  padding: 25rpx 0;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
  color: #999;

  .record-msg {
    display: flex;
    justify-content: space-between;
    line-height: 55rpx;
    font-size: 22rpx;
  }

  .record-type {
    color: #333;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    column-gap: 8rpx;
  }

  .record-price {
    font-size: 28rpx;
  }

  .red {
    color: #e64340;
    font-size: 22rpx;
  }
}

.header {
  padding: 25rpx 30rpx;
  color: #fff;
  background: #2133ff;
  font-size: 26rpx;

  .price {
    font-size: 38rpx;
    font-weight: bold;
    margin: 25rpx 0;
  }

  .tip-total {
    font-size: 22rpx;
  }
}

.record-list {
  padding: 30rpx;
  background: #fff;
}

.record-filter {
  display: flex;
  justify-content: space-between;

  .time,.type {
    display: flex;
    padding: 10rpx 20rpx;
    background: rgba(0, 0, 0, 0.03);
    color: #333;
    font-size: 22rpx;
    column-gap: 20rpx;
    border-radius: 4rpx;
    align-items: center;

    .iconfont {
      font-size: 20rpx;
    }
  }
}
</style>