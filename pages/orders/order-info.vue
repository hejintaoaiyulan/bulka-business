<script setup>
</script>

<template>
<view class="container">
  <view class="content">
    <view class="card">
      <view class="title">
        <view class="status-text">用戶取消訂單</view>
        <view class="result">不想要了</view>
      </view>
      <view class="sub-title">用戶已取消訂單，訂單金額將原路返回</view>
    </view>

    <view class="card">
      <view class="title">客戶信息</view>
      <view class="user-content">
        <view class="user">
          <uv-avatar :size="30" src="/static/image/img-6.png" />
          <text>小柯基123</text>
        </view>
        <view class="mobile">1300000000</view>
      </view>
      <view class="call">
        <view class="call-button">聯繫客戶<view class="iconfont icon-dianhua"></view></view>
      </view>
    </view>

    <view class="card">
      <view class="title">餐品詳情</view>
      <view class="order-content">
        <view class="order-single-msg">
          <view class="order-img">
            <image src="/static/image/img-6.png" mode="aspectFit"
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
      <view class="order-content">
        <view class="order-single-msg">
          <view class="order-img">
            <image src="/static/image/img-6.png" mode="aspectFit"
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

      <view class="title">贈品</view>
      <view class="gift-item">
        <view class="gift-img">
          <image src="/static/image/img-6.png" mode="aspectFill"
                 style="width: 90rpx; height: 90rpx"/>
        </view>
        <view class="gift-content">
          <view class="gift-title">巧心師 明信片30張 新年賀卡春節</view>
          <view class="gift-count">* 1</view>
        </view>
      </view>

      <view class="form-item" style="margin-top: 20rpx">
        <view class="form-label">費用合計</view>
        <view class="form-value red-text">
          HK$ 12.00
        </view>
      </view>
      <view class="form-item">
        <view class="form-label">訂單備註</view>
        <view class="form-value">
          <text class="placeholder">訂單備註</text>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="title">訂單信息</view>
      <view class="form-item">
        <view class="form-label">訂單編號</view>
        <view class="form-value">123456789</view>
      </view>
      <view class="form-item">
        <view class="form-label">下單時間</view>
        <view class="form-value">2022-12-12 12:00:00</view>
      </view>
      <view class="form-item">
        <view class="form-label">費用合計</view>
        <view class="form-value">HK$ 12.00</view>
      </view>
      <view class="form-item">
        <view class="form-label">支付方式</view>
        <view class="form-value">微信支付</view>
      </view>
      <view class="form-item">
        <view class="form-label">
          <text>支付時間</text>
        </view>
        <view class="form-value">
          <text>2022-12-12 12:00:00</text>
        </view>
      </view>
    </view>
  </view>
  <view class="submit-button flex-right safe-pb">
    <uv-button>取消訂單</uv-button>
  </view>
</view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}
.gift-item {
  display: flex;
  column-gap: 20rpx;
  font-size: 26rpx;
  align-items: center;
  .gift-count {
    color: #666;
  }
}
.user-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid rgba(0,0,0,0.1);

  .user {
    display: flex;
    align-items: center;
    column-gap: 8rpx;
    font-size: 26rpx;
  }
  .mobile {
    font-size: 26rpx;
    color: #333;
  }


}
.call {
   margin-top: 20rpx;
 }
.call-button {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10rpx;
  font-size: 28rpx;
  .iconfont {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a5adb3;
    color: #fff;
  }
}
.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}
.submit-button {
  padding-top: 20rpx;
  padding-right: 20rpx;
  padding-left: 20rpx;
  flex: none;
  background-color: #fff;
}

.card {
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  .title {
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20rpx;
    .status-text {
      color: #333;
      font-size: 28rpx;
    }
    .result {
      color: #333;
      font-size: 28rpx;
    }
  }
  .sub-title {
    color: #999;
    font-size: 24rpx;
    margin-top: 20rpx;
  }
}


.order-content {
  display: flex;
  column-gap: 50rpx;
  margin-bottom: 20rpx;
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
  .count {
    color: #999;
    font-size: 24rpx;
  }
}

.form-item {
  padding: 10rpx 0;
  font-size: 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20rpx;
}

.form-label {
  flex: none;
}

.form-value {
  font-size: 26rpx;
  flex: 1;
  text-align: right;
}

.placeholder {
  color: #888888;
  font-size: 26rpx;
  padding: 12rpx 22rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .iconfont {
    font-size: 24rpx;
    color: #666;
  }
}
</style>
