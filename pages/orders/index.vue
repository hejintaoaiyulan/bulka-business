<script setup>
import {ref} from 'vue'

const storeTab = [
  {
    name: '全部',
    key: 1
  },
  {
    name: '待支付',
    key: 2
  },
  {
    name: '待接單',
    key: 3
  },
  {
    name: '待出餐',
    key: 4
  },
  {
    name: '待取餐',
    key: 5
  },
  {
    name: '已完成',
    key: 6
  },
  {
    name: '已取消',
    key: 7
  }
]

const topTab = ref([
  {
    name: '門店自取',
    key: 1
  },
  {
    name: '門店堂食',
    key: 2
  }
])
const tabs = ref(storeTab)


const handleToInfo = () => {
  uni.navigateTo({
    url: '/pages/orders/order-info'
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <view class="top-tabs">
        <uv-tabs :list="topTab" :scrollable="false" item-style="background-color: #000;color: #fff; height: 90rpx"
                 lineColor="transparent" :active-style="{color: '#fff'}" :inactive-style="{color: '#b4b4b4'}"></uv-tabs>
      </view>
      <uv-tabs :list="tabs" line-color="#c74336"></uv-tabs>
    </view>
    <scroll-view :scroll-y="true" class="content">
      <view style="padding: 20rpx">
        <view class="order-item" @click="handleToInfo">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
            <view class="order-btns">
              <uv-button type="text" custom-style="background-color: #fff !important; color: #000 !important;">取消订单</uv-button>
              <uv-button>接單</uv-button>
            </view>
          </view>
        </view>
        <view class="order-item">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
            <view class="order-btns">
              <uv-button>取消订单</uv-button>
            </view>
          </view>
        </view>
        <view class="order-item">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
            <view class="order-btns">
              <uv-button type="text" custom-style="background-color: #fff !important; color: #000 !important;">取消订单</uv-button>
              <uv-button>确认出餐</uv-button>
            </view>
          </view>
        </view>
        <view class="order-item">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
            <view class="order-btns">
              <uv-button>联系客户领取</uv-button>
            </view>
          </view>
        </view>
        <view class="order-item">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
          </view>
        </view>
        <view class="order-item">
          <view class="order-title">
            <view class="user">
              <uv-avatar src="/static/image/img-6.png" :size="30"/>
              <text>用戶1</text>
            </view>
            <view class="status">待支付</view>
          </view>
          <view class="order-content">
            <view class="order-single-msg">
              <view class="order-img">
                <image src="/static/image/img-6.png" mode="aspectFill"
                       style="width: 100rpx; height: 100rpx"/>
              </view>
              <view class="order-msg">
                <view class="order-title">熱烈狂歡國五套餐：精選食材，精選無限風味</view>
                <view class="order-tip">
                  小份、中辣
                </view>
              </view>
            </view>
            <view class="price-msg">
              <view class="price">HK$ 12.00</view>
              <view class="count">共1件</view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">2022-10-12 12:00</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
:global(page) {
  height: 100%;
}

.top-tabs {
  background-color: #fff;
  color: #fff;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
}

.header {
  //position: sticky;
  //top: 0;
  //left: 0;
  background-color: #f8f8f8;
  padding-bottom: 10rpx;
  z-index: 100;
}

.order-item {
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .order-title {
    display: flex;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
      column-gap: 10rpx;
      color: #333;
    }

    .status {
      color: #999;
      font-size: 24rpx;
    }
  }

  .order-content {
    display: flex;
    column-gap: 50rpx;
  }

  .order-single-msg {
    display: flex;
    column-gap: 20rpx;

    .order-img {
      border-radius: 10rpx;
    }

    .order-tip {
      color: #999;
      font-size: 24rpx;
    }
  }

  .order-title {
    font-size: 28rpx;
  }

  .price-msg {
    font-size: 26rpx;
    white-space: nowrap;

    .price {
      color: #c74336;
    }
  }

  .order-operation {
    padding: 20rpx 0;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .order-time {
      font-size: 26rpx;
    }
  }

  .order-btns {
    display: flex;
    column-gap: 20rpx;
  }
}

.container {
  background-color: #f8f8f8;
  height: 100%;
}

.operation-item {
  :global(.uv-button){
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
