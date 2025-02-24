<script setup>
import {ref} from 'vue'
const tabs = ref([
  {
    name: '全部',
    key: 1
  },
  {
    name: '有圖',
    key: 2,
    badge: {
      value: 99
    }
  },
  {
    name: '好評',
    key: 3,
    badge: {
      value: 99
    }
  },
  {
    name: '中評',
    key: 4,
    badge: {
      value: 99
    }
  },
  {
    name: '差評',
    key: 5,
    badge: {
      value: 99
    }
  }
])

const handleReply = () => {
  uni.navigateTo({
    url: '/pages/manages/comments/reply-comment'
  })
}
</script>

<template>
<view class="container">
  <view class="header">
    <uv-tabs :list="tabs" line-color="#c74336" :scrollable="false" />
  </view>
  <view class="content">
    <view class="comment-list">
      <view class="comment-item">
        <view class="comment-title">
          <view class="user">
            <uv-avatar src="/static/image/img-6.png" :size="30" />
            <text>用戶1</text>
          </view>
          <view class="time">
            2022-12-12 12:00
          </view>
        </view>
        <view class="comment-star">
          <uv-rate :count="5"></uv-rate>
        </view>
        <view class="comment-content">
          啥幹啥了結果的路上看見過了時間噶零售價格看電視了高速公路上科技公司兩個加兩個睡懶覺酸辣粉就收到了感覺殺了感覺阿里個
        </view>
        <view class="comment-pictures">
          <view class="picture-item">
            <image src="/static/image/img-6.png" mode="aspectFill" />
          </view>
        </view>
        <view class="comment-goods">麻辣香鍋雙人套餐</view>
        <view class="comment-operation flex-right">
          <uv-button size="normal" @click="handleReply">回復評論</uv-button>
        </view>
      </view>
      <view class="comment-item">
        <view class="comment-title">
          <view class="user">
            <uv-avatar src="/static/image/img-6.png" :size="30" />
            <text>用戶1</text>
          </view>
          <view class="time">
            2022-12-12 12:00
          </view>
        </view>
        <view class="comment-star">
          <uv-rate :count="5"></uv-rate>
        </view>
        <view class="comment-content">
          啥幹啥了結果的路上看見過了時間噶零售價格看電視了高速公路上科技公司兩個加兩個睡懶覺酸辣粉就收到了感覺殺了感覺阿里個
        </view>
        <view class="comment-pictures">
          <view class="picture-item">
            <image src="/static/image/img-6.png" mode="aspectFill" />
          </view>
        </view>
        <view class="comment-goods">麻辣香鍋雙人套餐</view>
        <view class="comment-operation flex-right">
          <uv-button size="normal">回復評論</uv-button>
        </view>
      </view>
      <view class="comment-item">
        <view class="comment-title">
          <view class="user">
            <uv-avatar src="/static/image/img-6.png" :size="30" />
            <text>用戶1</text>
          </view>
          <view class="time">
            2022-12-12 12:00
          </view>
        </view>
        <view class="comment-star">
          <uv-rate :count="5"></uv-rate>
        </view>
        <view class="comment-content">
          啥幹啥了結果的路上看見過了時間噶零售價格看電視了高速公路上科技公司兩個加兩個睡懶覺酸辣粉就收到了感覺殺了感覺阿里個
        </view>
        <view class="comment-pictures">
          <view class="picture-item">
            <image src="/static/image/img-6.png" mode="aspectFill" />
          </view>
        </view>
        <view class="comment-goods">麻辣香鍋雙人套餐</view>
        <view class="comment-operation flex-right">
          <uv-button size="normal">回復評論</uv-button>
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
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.header {
  flex: none;
  white-space: nowrap;
  padding-bottom: 10rpx;
}
.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.comment-list {
  display: flex;
  flex-direction: column;
  row-gap: 15rpx;
  .comment-item {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;
  }
  .comment-title {
    display: flex;
    .user {
      display: flex;
      align-items: center;
      column-gap: 10rpx;
      font-size: 26rpx;
    }
    justify-content: space-between;
    align-items: center;
    .time {
      font-size: 24rpx;
      color: #999;
    }
  }
  .comment-pictures {
    display: flex;
    column-gap: 20rpx;
    align-items: center;
    .picture-item {
      width: 180rpx;
      height: 180rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .comment-goods {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
