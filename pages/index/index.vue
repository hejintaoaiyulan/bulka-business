<template>
  <view class="content">
    <uv-navbar title="" bg-color="#000000" left-icon-color="#ffffff" leftText="店鋪詳情" safeAreaInsetTop placeholder
               fixed
               leftIcon="">
      <template #right>
        <view class="right" @click="handleRight">
          <text class="iconfont icon-saoma"></text>
        </view>
      </template>
    </uv-navbar>
    <view class="header-bg"></view>
    <view class="main">
      <view class="grid">
        <view class="grid-item">
          <view class="tip">今日營業額(HK$)</view>
          <view class="count">999.00</view>
        </view>
        <view class="grid-item">
          <view class="tip">今日訂單量</view>
          <view class="count">999.00</view>
        </view>
        <view class="grid-item">
          <view class="tip">今日已售商品(件)</view>
          <view class="count">999.00</view>
        </view>
        <view class="grid-item">
          <view class="tip">今日訪客(人)</view>
          <view class="count">999.00</view>
        </view>
      </view>
      <view class="work-platform">
        <view class="title">工作臺</view>
        <view class="manage-list">
          <view class="manage-item" @click="handleToCategory">
            <view class="icon">
              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />
            </view>
            <view class="msg">
              <view>商品分類管理</view>
              <view class="tip">設置門店商品分類</view>
            </view>
            <view class="right-icon">
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
          <view class="manage-item" @click="handleToRouter('/pages/manages/goods/index')">
            <view class="icon">
              <image src="https://img.yzcdn.cn/vant/apple-1.jpg" style="width: 100%; height: 100%" mode="aspectFill" />
            </view>
            <view class="msg">
              <view>商品管理</view>
              <view class="tip">當前已上架商品999件</view>
            </view>
            <view class="right-icon">
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
          <view class="manage-item" @click="handleToRouter('/pages/manages/promotions/index')">
            <view class="icon">
              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />
            </view>
            <view class="msg">
              <view>優惠活動管理</view>
              <view class="tip">設置多充商品組合優惠活動</view>
            </view>
            <view class="right-icon">
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
          <view class="manage-item" @click="handleToRouter('/pages/manages/exchange/index')">
            <view class="icon">
              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />
            </view>
            <view class="msg">
              <view>換購活動管理</view>
              <view class="tip">設置商品換購活動</view>
            </view>
            <view class="right-icon">
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
          <view class="manage-item" @click="handleToRouter('/pages/manages/comments/index')">
            <view class="icon">
              <image src="https://img.yzcdn.cn/vant/apple-1.jpg" style="width: 100%; height: 100%" mode="aspectFill" />
            </view>
            <view class="msg">
              <view>評論管理</view>
              <view class="tip">查看門店所有用戶評論</view>
            </view>
            <view class="right-icon">
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
// header掃碼
const handleRight = () => {

}

// 分類管理
const handleToCategory = () => {
  uni.navigateTo({
    url: '/pages/manages/goods-category/index'
  })
}

const handleToRouter = (path) => {
  uni.navigateTo({
    url: path
  })
}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss">
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.grid {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 10rpx;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  margin-top: -150rpx;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);

  .grid-item {
    width: 50%;
    text-align: center;
    padding: 30rpx;
    color: #333;
  }

  .tip {
    font-size: 28rpx;
  }

  .count {
    font-size: 36rpx;
    line-height: 62rpx;
  }
}

.right {
  color: #fff;

  .iconfont {
    font-size: 46rpx;
  }
}

.header-bg {
  height: 200rpx;
  background-color: #000;
  flex: none;
}

.main {
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .grid {
    flex: none;
  }
}

.work-platform {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;

  .title {
    flex: none;
  }

  .manage-list {
    flex: 1;
    overflow-y: auto;
    padding-top: 20rpx;
    padding-bottom: 20rpx;

    .manage-item {
      margin-bottom: 20rpx;
      padding: 20rpx;
      background-color: #fff;
      display: flex;
      column-gap: 20rpx;
      border-radius: 15rpx;
      align-items: center;

      .icon {
        width: 100rpx;
        height: 100rpx;
        flex: none;
      }

      .msg {
        flex: 1;
        line-height: 50rpx;

        .tip {
          font-size: 28rpx;
          color: #999;
        }
      }

      .right-icon {
        flex: none;
        font-size: 40rpx;
        color: #666;
      }
    }
  }
}
</style>
