<script setup>
import { ref } from 'vue'
const popUp = ref()

const formData = ref({
  mode: 'single'
})

const handleBack = () => {
  uni.navigateBack()
}

const handleAddItem = () => {
  popUp.value?.open()
}
</script>

<template>
  <view class="container">
    <uv-navbar
      title="设置商品规格"
      fixed
      bg-color="#000000"
      title-style="color: #fff"
      safeAreaInsetTop
      placeholder
      @left-click="handleBack"
      left-icon-color="#fff"
    >
      <template #right>
        <text class="add-spec">新增规格</text>
      </template>
    </uv-navbar>
    <view class="content">
      <view class="card">
        <view class="card-title">規格一</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規格名稱</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" class="form-input" :border="false" placeholder="請輸入規格名称"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否支持多選</text>
            </view>
            <view class="form-value">
              <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.mode">
                <uv-radio name="multiple" label="是"></uv-radio>
                <uv-radio name="single" label="否"></uv-radio>
              </uv-radio-group>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規則選項</text>
            </view>
            <view class="form-value" @click="handleAddItem">
              <text class="setting-mode">添加規格項</text>
            </view>
          </view>
        </view>
        <view class="card-title">規格選項</view>
        <view class="option-list">
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">規格二</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規格名稱</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" class="form-input" :border="false" placeholder="請輸入規格名称"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否支持多選</text>
            </view>
            <view class="form-value">
              <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.mode">
                <uv-radio name="multiple" label="是"></uv-radio>
                <uv-radio name="single" label="否"></uv-radio>
              </uv-radio-group>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規則選項</text>
            </view>
            <view class="form-value">
              <text class="setting-mode">添加規格項</text>
            </view>
          </view>
        </view>
        <view class="card-title">規格選項</view>
        <view class="option-list">
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
          <view class="option">
            <view class="option-title">
              <view class="name">微辣</view>
              <view class="remove-icon">
                <text class="iconfont icon-shanchu"></text>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HKS 12.00</view>
              <view class="inventory">庫存999</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb">
      <uv-button type="primary">保存</uv-button>
    </view>

    <uv-popup mode="bottom" ref="popUp">
      <view class="pop-content">
        <view class="title">添加规格項</view>
        <view class="form">
          <view class="form-item">
            <uv-input placeholder="輸入規格項名稱" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入原價（HK$）" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入售價（HK$）" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入庫存數量" />
          </view>
          <view class="form-item">
            <uv-button type="primary" class="button">確認</uv-button>
          </view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.submit-button {
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
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

.setting-mode {
  color: #3c9cff;
}

.option-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx 20rpx;
  margin-top: 15rpx;
  justify-content: space-between;
  .option {
    width: 48%;
    padding: 20rpx;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    .option-title {
      font-weight: bold;
      color: #333;
      font-size: 30rpx;
      display: flex;
      justify-content: space-between;
    }
    .option-price {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 26rpx;
    }
  }
}

.add-spec {
  color: #fff;
  font-size: 26rpx;
}

.form {
  padding: 30rpx;
  .form-item {
    margin-bottom: 20rpx;
  }
}

.pop-content {
  //height: 440rpx;
  .title {
    text-align: center;
    padding: 10rpx 0;
  }
}
</style>
