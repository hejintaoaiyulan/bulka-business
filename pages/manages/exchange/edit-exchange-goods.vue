<script setup>
</script>

<template>
<view class="container">
  <view class="content">
    <view class="goods-item">
      <view class="goods-content">
        <view class="goods-img">
          <image src="/static/image/img-6.png" mode="aspectFill" style="width: 100rpx; height: 100rpx" />
        </view>
        <view class="goods-msg">
          <view class="goods-title">
            熱烈狂歡換購套餐
          </view>
          <view class="goods-tip">精選新鮮食材，盡享無限風味</view>
          <view class="goods-price">
            <view class="price">HK$ 12.00</view>
            <view class="inventory">
              <text>銷量999</text>
              <text>|</text>
              <text>庫存999</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">換購信息</view>
      <view class="card-form">
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>換購價格</text>
          </view>
          <view class="form-value">
            <uv-input placeholder="請輸入換購價格(HK$)" :border="false" input-align="right" fontSize="26rpx" type="digit" />
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
<!--            <text class="red-text">*</text>-->
            <text>限購數量</text>
          </view>
            <view class="form-value flex-right" style="column-gap: 10rpx">
              <text>最大限購</text><uv-number-box :step="1"></uv-number-box>
            </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>商品庫存
            </text>
          </view>
            <view class="form-value flex-right" style="column-gap: 10rpx">
              <text>當前庫存</text>
              <uv-number-box :step="1"></uv-number-box>
            </view>
        </view>
      </view>
    </view>
  </view>
  <view class="submit-button safe-pb">
    <view class="remove-tip">移除當前換購商品</view>
    <uv-button type="primary">保存</uv-button>
  </view>
</view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}
.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.remove-tip {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
}
.content {
  flex: 1;
  padding: 20rpx;
}
.goods-content {
  display: flex;
  align-items: center;
  column-gap: 20rpx;
  flex: 1;
}
.goods-item {
  margin-bottom: 20rpx;
  background-color: #fff;
  width: 100%;
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  column-gap: 20rpx;
  .goods-img {
    border-radius: 10rpx;
    image {
      vertical-align: middle;
    }
  }
  .goods-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    column-gap: 20rpx;
    .goods-title {
      color: #000;
      font-size: 30rpx;
    }
    .goods-tip {
      color: #888;
      font-size: 26rpx;
      padding: 10rpx 0;
    }
    .goods-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #f60;
        font-size: 30rpx;
      }
      .inventory {
        color: #888;
        font-size: 26rpx;
        display: flex;
        column-gap: 10rpx;
      }
    }
  }
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
    align-items: center;
  }

  .form-item {
    padding: 20rpx 0;
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
}

.submit-button {
  padding-top: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
  flex: none;
}
</style>
