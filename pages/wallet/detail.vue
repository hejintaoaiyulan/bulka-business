<script setup>
</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="header">
        <view class="search">
          <uv-input prefix-icon="search" placeholder="请输入订单编号、商品名称、所属用户" clearable/>
        </view>
        <view class="search-box">
          <text>结算周期：2022-12-12 至 2022-12-12</text>
          <text>共10笔订单</text>
        </view>
      </view>

      <view class="order-list">
        <view class="card">
          <view class="card-content">
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">订单编号：</view>
                <view class="msg-item-value">0000000000001</view>
              </view>
              <view class="msg-item-right red">+HK$2000</view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">订单类型：</view>
                <view class="msg-item-value">自取订单</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">商品名称：</view>
                <view class="msg-item-value">热烈狂欢锅物套餐：精选食材，尽享无限风味</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">所属用户：</view>
                <view class="msg-item-value">张三</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">完成时间：</view>
                <view class="msg-item-value">2020-02-02 11：00：00</view>
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

.container {
  height: 100%;
  background: #f8f8f8;
}

.content {
  padding: 20rpx;
}

.header {
  position: sticky;
  z-index: 10;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.search-box {
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 50rpx;
}

.search {
  padding: 10rpx;
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

.msg-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10rpx;
  color: #333;
  font-size: 26rpx;
  line-height: 46rpx;

  .msg-item-left {
    display: flex;
    align-items: center;
    column-gap: 10rpx;
  }

  .red {
    color: #e64340;
  }
}
</style>