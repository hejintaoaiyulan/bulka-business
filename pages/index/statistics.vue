<script setup>
import GoodsItem from "@/components/GoodsItem.vue";
</script>

<template>
<view class="container">
  <view class="content safe-pb">
    <view class="card">
      <view class="card-title">
        試食商品數據
      </view>
      <view class="card-content">
        <view class="goods-list">
          <view>
            <GoodsItem avatar-size="110rpx" >
              <template v-slot:tag>
                <view class="tag">精选新鲜食材，尽享无限风味</view>
              </template>
              <template v-slot:footer>
                <view class="footer">
                  <view class="price">HK$ 12.00</view>
                  <view class="numbers">
                    <text>点击量 999</text>
                    <text>|</text>
                    <text>下单量 999</text>
                  </view>
                </view>
              </template>
            </GoodsItem>
          </view>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">
        商品數據
      </view>
      <view class="card-sub-title">
        统计用户每日商品点击数以及下单数
      </view>
      <view class="card-content">

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
  background-color: #f8f8f8;
  padding: 20rpx;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  .price {
    color: #e64340;
  }
  .numbers {
    color: #999;
    display: flex;
    align-items: center;
    column-gap: 20rpx;
  }
}
.tag {
  color: #999;
  font-size: 24rpx;
  margin: 15rpx 0;
}
.goods-list {
  > view {
    padding: 20rpx 0;
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0,0,0,0.05);
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
  }

  .card-sub-title {
    color: #999;
    font-size: 24rpx;
    line-height: 40rpx;
    margin-bottom: 20rpx;
  }
}
</style>