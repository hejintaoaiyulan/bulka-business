<script setup>
import {ref, onUnmounted} from 'vue'
import {getShopCheck, getShopType, SaveShopCheck, UploadUrl} from "../../api/public";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import {useFileUpload} from "../../utils/uploadFile";
import PickerSelect from "../../components/PickerSelect.vue";
import {onShow} from '@dcloudio/uni-app'
import {pick} from "lodash";

const currentStep = ref(1)
const {uploadFile} = useFileUpload()

const info = ref({})
const types = ref([])
const isCheckError = ref(false)

const getInfo = () => {
  getShopCheck().then(res => {
    const {status} = res.data || {};
    if(status === 1) {
      isCheckError.value = false
      currentStep.value = 2
    }
    if(status === 3) {
      isCheckError.value = true
      currentStep.value = 2
    }
    if(status === 2) {
      isCheckError.value = false
      currentStep.value = 3
    }
  })
}

const getTypes = () => {
  getShopType().then(res => {
    types.value = res.data || []
  })
}

onShow(() => {
  getTypes()
  getInfo()
})

const handleChooseImage = () => {
  uploadFile({
    url: UploadUrl,
    name: 'image',
    count: 1,
    fileType: ['image']
  }).then(res => {
    const [avatarObj] = res || []
    info.value.shop_avatar = avatarObj.path
    info.value.show_shop_avatar = avatarObj.url
  }).finally(() => {
  })
}

const handleChooseMaterialImage = () => {
  uni.showLoading({
    title: '上传中'
  })
  uploadFile({
    url: '/store/index/uploadImage',
    name: 'image',
    count: 1,
    fileType: ['image']
  }).then(res => {
    const [urlObj] = res || []
    info.value.material_image = urlObj.path
    info.value.show_material_image = urlObj.url
  }).finally(() => {
    uni.hideLoading()
  })
}

const handleSelectType = (obj) => {
  info.value.shop_type = obj.id
  info.value.shop_type_name = obj.name
}

const handleChooseDirector = () => {
  uploadFile({
    url: '/store/index/uploadImage',
    name: 'image',
    count: 2 - (info.value.director_images?.length || 0),
    fileType: ['image']
  }).then(res => {
    info.value.view_images = (info.value.view_images || []).concat(res)
    info.value.director_images = info.value.view_images.map(item => item.path)
  })
}

const handleShowActions = (file, index) => {
  uni.showActionSheet({
    itemList: ['查看', '删除'],
    success: res => {
      if (res.tapIndex === 0) {
        uni.previewImage({
          urls: info.value.view_images.map(item => item.url),
          current: file.url
        })
      } else if (res.tapIndex === 1) {
        info.value.view_images.splice(index, 1)
        info.value.director_images = info.value.view_images.map(item => item.path)
      }
    }
  })
}

const handleSubmit = () => {
  const params = pick(info.value, ['shop_avatar', 'shop_name', 'shop_type', 'contact_name', 'contact_tel', 'address', 'material_image', 'director_images', 'company_tel', 'bank_acccount'])
  SaveShopCheck({...params, longitude: '115.7', latitude: '39.4'}).then(res => {
    console.log(res)
    getInfo()
  })
}

const handleToHome = () => {
  uni.reLaunch({
    url: '/pages/index/index'
  })
}
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
              <view class="add-file-box" v-if="!info.shop_avatar" @click="handleChooseImage">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseImage">
                <uv-image :src="info.show_shop_avatar" mode="aspectFit" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品名稱</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" v-model="info.shop_name" fontSize="26rpx" :border="false"
                        placeholder="請輸入商家名稱"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>入駐分類</text>
            </view>
            <picker-select :options="types" key-name="name" @change="handleSelectType">
              <view class="form-value">
                <text class="placeholder">
                  {{info.shop_type_name || '請選擇入駐分類'}}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </picker-select>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>聯繫人</text>
            </view>
            <view class="form-value">
              <uv-input v-model="info.contact_name" inputAlign="right" fontSize="26rpx" :border="false"
                        placeholder="請輸入聯繫人"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>手機號碼</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" v-model="info.contact_tel" fontSize="26rpx" :border="false"
                        placeholder="請輸入手機號碼"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>地址</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" v-model="info.address" fontSize="26rpx" :border="false"
                        placeholder="請輸入地址"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商業登記資料</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box" v-if="!info.material_image" @click="handleChooseMaterialImage">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseMaterialImage">
                <uv-image :src="info.show_material_image" mode="aspectFit" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>負責人身份證照片</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box show-picture" v-for="(img, index) in info.view_images" :key="index"
                    @click="handleShowActions(img, index)">
                <uv-image :src="img.url" mode="aspectFit" width="100%" height="100%" radius="5"/>
              </view>
              <view class="add-file-box" v-if="(info.director_images?.length || 0) < 2" @click="handleChooseDirector">
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
              <uv-input inputAlign="right" v-model="info.company_tel" fontSize="26rpx" :border="false"
                        placeholder="請輸入公司電話"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>收款銀行賬戶</text>
            </view>
            <view class="form-value">
              <uv-input inputAlign="right" v-model="info.bank_acccount" fontSize="26rpx" :border="false"
                        placeholder="請輸入收款銀行賬戶"/>
            </view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 2" class="card">
        <view class="result-content" style="padding-top: 40rpx" v-if="isCheckError">
          <view class="pass-img">
            <image src="/static/pass-fail.png" mode="scaleToFill"/>
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
        <view class="result-content" style="padding-top: 40rpx">
          <view class="pass-img">
            <image src="/static/pass.png" mode="scaleToFill"/>
          </view>
          <view class="pass-text text-center">
            <view class="pass-desc">提交成功</view>
            <view class="pass-desc">正在審核中，請耐心等待</view>
          </view>
        </view>
      </view>
      <view v-if="currentStep === 3" class="card">

        <view class="result-content" style="padding-top: 40rpx">
          <view class="pass-img">
            <image src="/static/pass.png" mode="scaleToFill"/>
          </view>
          <view class="pass-text">
            <text>資料審核通過，入駐成功</text>
          </view>
          <view class="submit-button w-full">
            <uv-button custom-style="background: black; color: #fff" @click="handleToHome">進入商家主頁</uv-button>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb" v-if="currentStep === 1">
      <uv-button custom-style="background: black; color: #fff;" :hairline="false" @click="handleSubmit">提交申請
      </uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
.text-center {
  text-align: center;
}
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

  &.show-picture {
    border: none;
  }
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
