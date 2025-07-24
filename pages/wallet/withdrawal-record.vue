<script setup>

import {ref, computed} from "vue";
import dayjs from "dayjs";

const date = ref(dayjs());
const dateStr = computed(() => {
  return date.value.format('YYYY-MM')
})
const handleInfo = (record) => {
  uni.showModal({
    title: '提现失败原因',
    content: '请检查您的银行卡信息是否正确，或联系客服处理。',
    showCancel: false,
    confirmText: '知道了'
  })
}

// 处理日期选择
const handleChangeDate = (evt) => {
  const value = evt.detail.value;
  date.value = dayjs(value);
  // 可以在这里触发数据重新加载
  // console.log('选择的日期:', date.value.format('YYYY-MM'));
  if(date.value.isAfter(dayjs(), 'd')) {
    uni.showToast({
      title: '不能选择未来的日期',
      icon: 'none'
    });
    date.value = dayjs();
  }
}
</script>

<template>
  <view class="container safe-pb">
    <view class="header">
      <view>累计提现(HK$)</view>
      <view class="price">9999.999</view>
      <view class="tip-total">提现中：99999.00HK$</view>
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
        <view class="record-item">
          <view class="record-msg">
            <view class="record-type">
              <text>提现中</text>
              <text class="red tip" @click="handleInfo()">查看原因</text>
            </view>
            <view class="record-price">-200</view>
          </view>
          <view class="record-msg">
            <view class="record-order">订单号：TX2345648979</view>
            <view class="record-time">05-08 18：00</view>
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