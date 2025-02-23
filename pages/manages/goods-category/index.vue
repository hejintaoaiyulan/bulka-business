<script setup>
import { ref } from 'vue'

const popRef = ref()

const tags = ref([
  {name: '當季限定', key: 1}
])

// 添加分類標籤
const handleAddTag = () => {
  popRef.value?.open()
}
</script>

<template>
<view class="container">
  <view class="category-list">
    <view class="category-item flex-center" v-for="(item, index) in tags" :key="item.key">
      <view>{{ item.name }}</view>
      <view class="remove-icon flex-center">
        <text class="iconfont icon-jianhao"></text>
      </view>
    </view >
    <view class="category-item flex-center" @click="handleAddTag">
      <text class="iconfont icon-jiajianzujianjiahao"></text>
    </view>
  </view>
  <uv-popup custom-style="height: 480rpx" ref="popRef" mode="bottom">
    <view class="content safe-pb">
      <view class="title">添加分類</view>
      <view class="form">
        <view class="form-item">
          <uv-input placeholder="輸入分類名稱" />
        </view>
        <view class="form-item">
          <uv-input placeholder="輸入排序（數字越大排序越靠前）" />
        </view>
        <view class="form-item">
          <uv-button type="primary" class="button">確定新增/保存</uv-button>
        </view>
      </view>
    </view>
  </uv-popup>
</view>
</template>

<style scoped lang="scss">
.title {
  font-size: 32rpx;
  text-align: center;
  padding: 20rpx;
  color: #333;
}
.form {
  padding: 30rpx;
  .form-item {
    margin-bottom: 20rpx;
  }
}
.container {
  padding: 30rpx;
}
.category-list {
  display: flex;
  column-gap: 30rpx;
  row-gap: 40rpx;
  flex-wrap: wrap;

  .category-item {
    width: 30%;
    text-align: center;
    background-color: #0c102c;
    color: #fff;
    font-size: 32rpx;
    position: relative;
    border-radius: 8rpx;
    height: 80rpx;
  }
  .remove-icon {
    position: absolute;
    right: -20rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    display: flex;
    background-color: #df6867;
    top: -20rpx;
  }
}
</style>
