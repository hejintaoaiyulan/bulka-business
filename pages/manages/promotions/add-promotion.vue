<script>
export default {
  name: "add-promotion"
}
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="card">
        <view class="card-title">活動基本信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動名稱</text>
            </view>
            <view class="form-value">
              <uv-input placeholder="請輸入活動名稱" :border="false" input-align="right" fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動開始時間</text>
            </view>
            <picker mode="date">
              <view class="form-value">
                <view class="placeholder">請選擇活動開始時間<text class="iconfont icon-shijian"></text></view>
              </view>
            </picker>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動結束時間
              </text>
            </view>
            <picker mode="date">
              <view class="form-value">
                <view class="placeholder">請選擇活動結束時間
                  <text class="iconfont icon-shijian"></text>
                </view>
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">
          <view>活動商品</view>
          <view class="setting-mode">添加商品</view>
        </view>
        <view class="card-form">
          <view class="empty">暫無商品，快去上傳吧</view>
        </view>
      </view>
    </view>

    <view class="submit-button safe-pb">
      <uv-button type="primary" block>保存</uv-button>
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

.content {
  padding: 20rpx;
  overflow-y: auto;
  flex: 1;
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

.submit-button {
  flex: none;
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
}

.setting-mode {
  color: #3c9cff;
  font-weight: normal;
  font-size: 28rpx;
}
.empty {
  text-align: center;
  padding: 40rpx 0;
  font-size: 26rpx;
  color: #666;
}
</style>
