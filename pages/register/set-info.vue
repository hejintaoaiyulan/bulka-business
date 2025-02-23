<script setup>
import { ref } from 'vue'

const currentStep = ref(1)
</script>

<template>
<view class="container">
  <view class="content">
    <view class="card">
      <view class="step-content">
        <uv-steps :current="currentStep">
          <uv-steps-item title="註冊賬號"></uv-steps-item>
          <uv-steps-item title="填寫資料"></uv-steps-item>
          <uv-steps-item title="等待審核"></uv-steps-item>
          <uv-steps-item title="入駐成功"></uv-steps-item>
        </uv-steps>
      </view>
    </view>

    <view v-if="currentStep === 1" class="card">
      <view class="card-title">商家基本信息</view>
      <view class="card-form">
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>商品頭像</text>
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
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入商家名稱"/>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>入駐分類</text>
          </view>
          <view class="form-value">
            <text class="placeholder">
              請選擇入駐分類
              <text class="iconfont icon-arrow-right-copy"></text>
            </text>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>聯繫人</text>
          </view>
          <view class="form-value">
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入聯繫人"/>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>手機號碼</text>
          </view>
          <view class="form-value">
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入手機號碼"/>
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>地址</text>
          </view>
          <view class="form-value">
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入地址"/>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>商業登記資料</text>
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
            <text>負責人身份證照片</text>
          </view>
          <view class="form-value flex-right">
            <view class="add-file-box">
              <view class="iconfont icon-jiajianzujianjiahao"></view>
            </view>
            <view class="add-file-box">
              <view class="iconfont icon-jiajianzujianjiahao"></view>
            </view>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>公司電話</text>
          </view>
          <view class="form-value">
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入公司電話"/>
          </view>
        </view>

        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>收款銀行賬戶</text>
          </view>
          <view class="form-value">
            <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入收款銀行賬戶"/>
          </view>
        </view>
      </view>
    </view >
    <view v-if="currentStep === 2" class="card">
      <view class="result-content" style="padding-top: 40rpx">
        <view class="pass-img">
          <image src="/static/pass-fail.png" mode="scaleToFill" />
        </view>
        <view class="pass-text">
          <view class="pass-desc">審核不通過</view>
          <view class="pass-desc">1.請重新提交</view>
          <view class="pass-desc">2.請重新提交</view>
        </view>
        <view class="submit-button w-full">
          <uv-button custom-style="background: black; color: #fff">重新編輯</uv-button>
        </view>
      </view>
    </view>
    <view v-if="currentStep === 3" class="card">

      <view class="result-content" style="padding-top: 40rpx">
        <view class="pass-img">
          <image src="/static/pass.png" mode="scaleToFill" />
        </view>
        <view class="pass-text">
          <text>資料審核通過，入駐成功</text>
        </view>
        <view class="submit-button w-full">
          <uv-button custom-style="background: black; color: #fff">進入商家主頁</uv-button>
        </view>
      </view>
    </view>
  </view>
  <view class="submit-button safe-pb" v-if="currentStep === 1">
    <uv-button custom-style="background: black; color: #fff;" :hairline="false">提交申請</uv-button>
  </view>
</view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}
.w-full {
  width: 100%;
}

.pass-text {
  line-height: 58rpx;
  font-size: 30rpx;
  color: #333;
}
.pass-img {
  width: 120rpx;
  height: 120rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.content {
  //padding-left: 20rpx;
  //padding-right: 20rpx;
  //padding-top: 20rpx;
  padding: 20rpx;
  flex: 1;
  overflow-y: auto;
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
  column-gap: 10rpx;
}

.setting-mode {
  color: #3c9cff;
}
.submit-button {
  flex: none;
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 30rpx;
  background-color: #fff;
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

.result-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20rpx;
}
</style>
