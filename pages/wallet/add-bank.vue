<script setup>

const handleBind = () => {
  uni.navigateTo({
    url: '/pages/wallet/bind-result'
  })
}
</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="form">
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>所属银行</text>
          </view>
          <view class="form-value">
            <text class="value empty">请选择银行</text>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>账户持有者</text>
          </view>
          <view class="form-value">
            <uv-input border="none" font-size="24rpx" input-align="right" placeholder="请输入账户持有者"/>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red">*</text>
            <text>账号号码</text>
          </view>
          <view class="form-value">
            <uv-input border="none" font-size="24rpx" input-align="right" placeholder="请输入账号号码"/>
          </view>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="confirm-button">
        <view class="btn" @click="handleBind">确认绑定</view>
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
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 30rpx 30rpx 0;
  font-size: 24rpx;
}

.footer {
  flex: none;
}
.red {
  color: #e64340;
}
.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    width: 80%;
    padding: 20rpx 30rpx;
    background-color: #007aff;
    text-align: center;
    color: #fff;
    font-size: 26rpx;
    border-radius: 10rpx;
  }
}
.form-item {
  line-height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>