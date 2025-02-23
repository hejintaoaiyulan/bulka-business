<script setup>
import {ref, computed} from "vue";

const formData = ref({
  mode: 'single',
  value1: true,
  value2: true
})

const single = computed(() => {
  return formData.value.mode === 'single'
})

const handleToSetSpecification = () => {
  uni.navigateTo({
    url: '/pages/manages/goods/specification'
  })
}
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="card">
        <view class="card-title">商品基礎信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品圖片</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品名稱</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" class="form-input" :border="false" placeholder="請輸入商品名稱"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品描述</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入商品名稱"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品分類</text>
            </view>
            <view class="form-value">
              <text class="placeholder">
                請選擇商品分類
                <text class="iconfont icon-arrow-right-copy"></text>
              </text>
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">商品規格及庫存</view>
        <view class="card-form">
          <template v-if="single">
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品規格</text>
              </view>
              <view class="form-value flex-right">
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.mode">
                  <uv-radio name="single" label="單規格"></uv-radio>
                  <uv-radio name="multiple" label="多規格"></uv-radio>
                </uv-radio-group>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品庫存</text>
              </view>
              <view class="form-value">
                <uv-input placeholder="請輸入商品庫存" :border="false" input-align="right" fontSize="26rpx" />
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品原價</text>
              </view>
              <view class="form-value">
                <uv-input placeholder="請輸入商品原價" type="digit" :border="false" input-align="right" fontSize="26rpx" />
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品售價</text>
              </view>
              <view class="form-value">
                <uv-input placeholder="請輸入商品售價" type="digit" :border="false" input-align="right" fontSize="26rpx" />
              </view>
            </view>
          </template>
          <template v-else>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>規格類型</text>
              </view>
              <view class="form-value flex-right">
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.mode">
                  <uv-radio name="single" label="單規格"></uv-radio>
                  <uv-radio name="multiple" label="多規格"></uv-radio>
                </uv-radio-group>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品規格</text>
              </view>
              <view class="form-value flex-right" @click="handleToSetSpecification">
                <text class="setting-mode">設置商品規格</text>
              </view>
            </view>
          </template>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品折扣</text>
            </view>
            <view class="form-value">
              <uv-input placeholder="請輸入商品折扣" type="digit" :border="false" input-align="right" fontSize="26rpx" />
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">更多設置</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否推薦</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch v-model="formData.value1"></uv-switch>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否上架</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch v-model="formData.value2"></uv-switch>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品順序</text>
            </view>
            <view class="form-value">
              <uv-input placeholder="請輸入商品順序" type="digit" :border="false" input-align="right" fontSize="26rpx" />
            </view>
          </view>
        </view>
      </view>
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
.submit-button {
  padding-top: 20rpx;
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

.placeholder {
  color: #888888;
  font-size: 26rpx;
  padding: 12rpx 22rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .iconfont {
    display: inline-block;
    font-size: 24rpx;
    transform: rotate(90deg);
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

.add-file-box {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1rpx dashed #888888;
  color: #888;
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.setting-mode {
  color: #3c9cff;
}

</style>
