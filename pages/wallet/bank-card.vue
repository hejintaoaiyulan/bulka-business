<script setup>

const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/wallet/add-bank'
  })
}

</script>

<template>
<view class="container safe-pb">
  <uv-navbar title="银行卡管理" bg-color="#fff" placeholder autoBack safe-area-inset-top>
    <template #right>
      <view class="right-text" @click="handleAdd">添加</view>
    </template>
  </uv-navbar>
  <view class="content">
    <view class="withdrawal-cards">
      <view class="card-item">
        <view class="card-icon">
          <image src="/static/bank-icon/bjyh.png" style="width: 100rpx; height: 100rpx;" mode="widthFix"/>
        </view>
        <view class="card-info">
          <view class="bank-name">中国银行</view>
          <view class="bank-number">**** **** **** 1234</view>
        </view>
        <view class="select-icon">
          <view>解绑</view>
        </view>
      </view>
      <view class="card-item">
        <view class="card-icon">
          <image src="/static/bank-icon/bjyh.png" style="width: 100rpx; height: 100rpx;" mode="widthFix"/>
        </view>
        <view class="card-info">
          <view class="bank-name">建设银行</view>
          <view class="bank-number">**** **** **** 1234</view>
        </view>
        <view class="select-icon">
          <view>解绑</view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.right-text {
  font-size: 22rpx;
}

.content {
  padding: 20rpx;
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

.select-icon {
  font-size: 22rpx;
  color: #666;
}
</style>