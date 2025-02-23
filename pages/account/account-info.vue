<script setup>

const handlePreviewImage = (url) => {
  uni.previewImage({
    urls: ['https://img.yzcdn.cn/vant/apple-1.jpg'],
    current: 0
  })
}

const handleToAlbum = () => {
  uni.navigateTo({
    url: '/pages/account/album'
  })
}
</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="card">
        <view class="card-title">商家信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店頭像</text>
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
              <text>門店背景圖</text>
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
              <text>店鋪名稱</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入店鋪名稱"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>店鋪地址</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入店鋪地址"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店定位</text>
            </view>
            <view class="form-value">
              <view class="setting-mode">獲取門店定位</view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店分類</text>
            </view>
            <view class="form-value">
              <text class="placeholder">
                請選擇門店分類
                <text class="iconfont icon-arrow-right-copy"></text>
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">
          <view>門店相冊</view>
          <view class="setting-mode" @click="handleToAlbum">管理相冊</view>
        </view>
        <view class="card-content">
          <view class="img-list">
            <view class="img-item" @click="handlePreviewImage">
              <image src="https://img.yzcdn.cn/vant/apple-1.jpg" mode="widthFix" />
            </view>
            <view class="img-item">
              <image src="https://img.yzcdn.cn/vant/apple-1.jpg" mode="widthFix" />
            </view>
            <view class="img-item">
              <image src="https://img.yzcdn.cn/vant/apple-1.jpg" mode="widthFix" />
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">
          <view>更多設置</view>
        </view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否接單</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否開啟門店自提</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否開啟門店堂食</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff">提交</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.img-list {
  display: flex;
  column-gap: 10rpx;
  .img-item {
    flex: 1;
    image {
      width: 100%;
      height: 50rpx;
    }
  }
}

.content {
  padding: 20rpx;
}

.card-content {
  margin-top: 20rpx;
}
.submit-button {
  padding: 30rpx;
}
.container {
  //height: 100%;
  background-color: #f8f8f8;
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
  font-weight: normal;
}
</style>
