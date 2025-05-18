<script setup>
import { ref } from 'vue'
import {onShow, onLoad} from '@dcloudio/uni-app'
import {getShopInfo, updateShopInfo} from "../../api/shop";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import {getShopType, UploadUrl} from "../../api/public";
import PickerSelect from "../../components/PickerSelect.vue";
import {useFileUpload} from "../../utils/uploadFile";
import {pick} from "lodash";
import {Toast} from "../../utils";

const formData = ref({
  order_on: 2,
  takeout_on: 2,
  dine_on: 2
})
const types = ref([])

const ImageBaseUrl = ref('')

onLoad(async () => {
  getInfo()
  getTypes()
  uni.$off('store-images')
  uni.$on('store-images', (d) => {
    formData.value.images = d
  })
})

const { uploadFile } = useFileUpload({showUploadLoading: true})

const handlePreviewImage = (url) => {
  uni.previewImage({
    urls: [url],
    current: 0
  })
}


const getTypes = () => {
  getShopType().then(res => {
    types.value = res.data || []
  })
}

const handleToAlbum = () => {
  const images = formData.value.images || []
  uni.setStorageSync('storeImages', images)
  uni.navigateTo({
    url: '/pages/account/album?base_url=' + ImageBaseUrl.value
  })
}

const getInfo = () => {
  getShopInfo().then((res) => {
    const d = res.data || {}
    ImageBaseUrl.value = d.base_url
    console.log(d)
    formData.value = {
      ...formData.value,
      ...d,
      show_bg_image: d.base_url + d.bg_image,
      show_shop_avatar: d.base_url + d.shop_avatar,
    }
  })
}

onShow(() => {
  // getInfo()
  uni.$off('setLocationData')
  uni.$on('setLocationData', (location) => {
    formData.value.latitude = location.lat?.toString();
    formData.value.longitude = location.lng?.toString();
    formData.value.address = location.address;
    formData.value.address_name = location.name
  })
})

const handleChooseAvatar = () => {
  uploadFile({
    count: 1,
    name: 'image',
    url: UploadUrl,
    fileType: ['image']
  }).then(res => {
    const [result] = res || []
    formData.value.shop_avatar = result?.path
    formData.value.show_shop_avatar = result?.url
  })
}

const handleChooseBg = () => {
  uploadFile({
    count: 1,
    name: 'image',
    url: UploadUrl,
    fileType: ['image']
  }).then(res => {
    const [result] = res || []
    formData.value.bg_image = result?.path
    formData.value.show_bg_image = result?.url
  })
}

const handleSelectType = (val) => {
  formData.value.shop_type = val.id
  formData.value.shop_type_name = val.name
}

const handleSubmit = () => {
  console.log('submit', formData.value)
  const params = pick(formData.value, ['shop_name', 'shop_type', 'shop_avatar', 'bg_image','images', 'address', 'order_on', 'takeout_on', 'dine_on', 'longitude', 'latitude'])
  updateShopInfo(params).then(() => {
    Toast.success('保存成功')
    getInfo()
  })
}


const handleLocation = () => {
	
	 uni.navigateTo({
	 	url: '/pages/map-webview/index'
	 })
  //
  // uni.chooseLocation({
  //   success: (result) => {
  //     console.log(result)
  //     const {latitude, longitude, address, name} = result || {}
  //     formData.value.longitude = longitude.toString()
  //     formData.value.latitude = latitude.toString()
  //     formData.value.address = address || ''
  //     formData.value.address_name = name || ''
  //   },
  //   complete: (result) => {
  //     console.log(result, 'complete')
  //   }
  // })
  
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
              <view class="add-file-box" v-if="!formData.shop_avatar" @click="handleChooseAvatar">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseAvatar">
                <uv-image :src="formData.show_shop_avatar" mode="aspectFit" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店背景圖</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box" v-if="!formData.bg_image" @click="handleChooseBg">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseBg">
                <uv-image :src="formData.show_bg_image" mode="aspectFit" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>店鋪名稱</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.shop_name" inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入店鋪名稱"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店定位</text>
            </view>
            <view class="form-value">
              <view class="setting-mode" @click="handleLocation">{{formData.address_name || '獲取門店定位'}}</view>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>店鋪地址</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.address" inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入店鋪地址"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>門店分類</text>
            </view>
            <PickerSelect :options="types" key-name="name" @change="handleSelectType">
              <view class="form-value">
                <text class="placeholder">
                  {{formData.shop_type_name || '請選擇門店分類'}}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </PickerSelect>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">
          <view>門店相冊</view>
          <view class="setting-mode" @click="handleToAlbum">管理相冊</view>
        </view>
        <view class="card-content">
          <view class="img-list" style="height: 150rpx">
            <view class="empty" v-if="!formData.images?.length">暫無相片</view>
            <view class="img-item" @click="handlePreviewImage" v-for="(img, index) in formData.images" :key="index">
              <uv-image :src="ImageBaseUrl + img" mode="widthFix" height="150rpx" width="100%"  />
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
              <uv-switch v-model="formData.order_on" :inactive-value="2" :active-value="1" />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否開啟門店自提</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch v-model="formData.takeout_on" :inactive-value="2" :active-value="1" />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否開啟門店堂食</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch v-model="formData.dine_on" :inactive-value="2" :active-value="1" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button">
      <uv-button custom-style="background: black; color: #fff" @click="handleSubmit">提交</uv-button>
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
    //flex: 1;
    width: 30%;
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
  &.show-picture {
    border: none;
  }
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.setting-mode {
  color: #3c9cff;
  font-weight: normal;
}

.empty {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #999;
  width: 100%;
}
</style>
