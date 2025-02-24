<script setup>
const handleToEdit = () => {
  uni.navigateTo({
    url: '/pages/manages/exchange/edit-exchange-goods'
  })
}
</script>

<template>
<view class="container">
  <view class="header">
    <view class="search-box">
      <view class="left-search">
        <uv-input placeholder="請輸入商品名稱" prefixIcon="search" fontSize="28rpx" style="width: 100%" :border="false" />
      </view>
      <view class="right-search">
        <view>選擇商品分類</view>
        <text class="iconfont icon-arrow-right-copy"></text>
      </view>
    </view>
  </view>
  <view class="content">
    <uv-checkbox-group>
      <view class="goods-item">
        <view class="goods-checkbox">
          <uv-checkbox name="1"></uv-checkbox>
        </view>
        <view class="goods-content" @click="handleToEdit">
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
      <view class="goods-item">
        <view class="goods-checkbox">
          <uv-checkbox name="1"></uv-checkbox>
        </view>
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
      <view class="goods-item">
        <view class="goods-checkbox">
          <uv-checkbox name="1"></uv-checkbox>
        </view>
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
      <view class="goods-item">
        <view class="goods-checkbox">
          <uv-checkbox name="1"></uv-checkbox>
        </view>
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
    </uv-checkbox-group>
  </view>
  <view class="submit-button safe-pb">
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
.left-search {
  background-color: #fff;
  border-radius: 10rpx;
  flex: 1;
}
.header {
  flex: none;
  //background-color: #fff;
  position: sticky;
  top: 0;
  padding: 30rpx;
  flex: none;
  column-gap: 20rpx;
}

.search-box {
  display: flex;
  column-gap: 20rpx;
  align-items: center;
  justify-content: space-between;
}

.right-search {
  font-size: 28rpx;
  flex: none;
  color: #333;
  border-radius: 10rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 17rpx 10rpx;
  width: 250rpx;

  .iconfont {
    transform: rotate(90deg);
  }
}

.content {
  padding-left: 30rpx;
  padding-right: 30rpx;
  flex: 1;
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
  .goods-checkbox {
    flex: none;
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

.submit-button {
  padding-top: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
  flex: none;
}
</style>
