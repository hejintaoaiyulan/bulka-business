<script setup>
import {ref} from 'vue'

const tabs = ref([
  {name: '全部', key: 1},
  {name: '未開始', key: 2},
  {name: '進行中', key: 3},
  {name: '已下架', key: 4},
  {name: '已結束', key: 5},
])

const handleAdd = () => {
  // console.log('handleAdd')
  uni.navigateTo({
    url: '/pages/manages/exchange/add-exchange'
  })
}

const handleRemove = () => {
  uni.showModal({
    title: '提示',
    content: '是否删除该商品？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

// 下架
const handleStop = () => {
  uni.showModal({
    title: '提示',
    content: '是否结束此换购活动？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <view class="search">
        <uv-input prefix-icon="search" placeholder="請輸入活動名稱" :border="false"/>
      </view>
      <view class="tabs">
        <uv-tabs :list="tabs" line-color="#c74336" :scrollable="false"></uv-tabs>
      </view>
    </view>
    <view class="content">
      <view class="promotion-item">
        <view class="promotion-title">
          <view class="name">12月換購活動</view>
          <view class="status">
            <uv-tags text="未開始" plain size="mini" type="primary"></uv-tags>
          </view>
        </view>
        <view class="promotion-time">
          <text>活動商品：100件</text>
        </view>
        <view class="promotion-time">
          <text>活動時間： 2022-12-12 12:00:00 至 2023-12-12-12:00</text>
        </view>
        <view class="promotion-operation">
          <uv-button class="operation-item" @click="handleRemove">
            <text>刪除</text>
          </uv-button>
          <uv-button class="operation-item" @click="handleStop">
            <text>結束</text>
          </uv-button>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb">
      <uv-button @click="handleAdd">新增換購活動</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}
.promotion-item {
  margin-bottom: 25rpx;
  padding: 20rpx;
  font-size: 28rpx;
  background-color: white;
  border-radius: 10rpx;
  .promotion-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: #000;
    }
  }
  .promotion-time {
    font-size: 24rpx;
    color: #333;
    line-height: 60rpx;
  }
  .promotion-operation {
    display: flex;
    justify-content: flex-end;
    column-gap: 10rpx;
  }
}
.search {
  width: 100%;
  background-color: #fff;
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  padding: 20rpx;
  flex: none;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}

.submit-button {
  flex: none;
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
}
.operation-item {
  :global(.uv-button){
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
