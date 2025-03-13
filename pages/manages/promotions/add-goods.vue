<script setup>
import UvImage from "../../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import {ref, unref} from "vue";
import UvNumberBox from "../../../uni_modules/uv-number-box/components/uv-number-box/uv-number-box.vue";
import {useFileUpload} from "../../../utils/uploadFile";
import {UploadUrl} from "../../../api/public";
import {onShow, onLoad} from "@dcloudio/uni-app";
import {uniqueId} from "lodash";

const {uploadFile} = useFileUpload()

const formData = ref({
  freebies_num: 1,
  goods_stock: 1
})

let option = {}
onLoad((query) => {
  option = query
  if(query?.isEdit?.toString() === '1') {
    const data = uni.getStorageSync('PromotionGoods')
    uni.removeStorageSync('PromotionGoods')
    if(data) {
      formData.value = unref(data)
      uni.setNavigationBarTitle({
        title: '編輯優惠活動'
      })
    }
  }
})

onShow(() => {
  if(!formData.value._id){
    formData.value._id = uniqueId()
  }
})

const handleChooseImage = () => {
  uploadFile({
    count: 1,
    url: UploadUrl,
    name: 'image',
    fileType: ['image']
  }).then(res => {
    const [result] = res || []
    formData.value.goods_image = result?.path
    formData.value.show_goods_image = result?.url
  })
}

const handleChooseFreebiesImage = () => {
  uploadFile({
    count: 1,
    url: UploadUrl,
    name: 'image',
    fileType: ['image']
  }).then(res => {
    const [result] = res || []
    formData.value.freebies_image = result?.path
    formData.value.show_freebies_image = result?.url
  })
}

const handleSave = () => {
  console.log(formData.value)
  uni.navigateBack({
    success: () => {
      console.log(option,'option')
      if(option?.isEdit?.toString() === '1') {
        uni.$emit('editGoods', unref(formData))
      }else
      uni.$emit('addGoods', unref(formData))
    }
  })
}
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="card">
        <view class="card-title">商品信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品圖片</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box" v-if="!formData.goods_image" @click="handleChooseImage">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseImage">
                <uv-image :src="formData.show_goods_image" mode="aspectFill" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品名稱</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.goods_name" inputAlign="right" class="form-input" :border="false"
                        placeholder="請輸入商品名稱"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品描述</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.goods_desc" inputAlign="right" fontSize="26rpx" :border="false"
                        placeholder="請輸入商品描述"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品原價</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.original_price" inputAlign="right" fontSize="26rpx" :border="false"
                        placeholder="請輸入商品原價(HK$)"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>換購價</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.sale_price" inputAlign="right" fontSize="26rpx" :border="false"
                        placeholder="請輸入換購價(HK$)"/>
            </view>
          </view>

          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品數量</text>
            </view>
            <view class="form-value flex-right">
              <uv-number-box v-model="formData.goods_stock"
                             input-align="right" fontSize="26rpx"/>
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">贈品信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>贈品圖片</text>
            </view>
            <view class="form-value flex-right">
              <view class="add-file-box" v-if="!formData.freebies_image" @click="handleChooseFreebiesImage">
                <view class="iconfont icon-jiajianzujianjiahao"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseFreebiesImage">
                <uv-image :src="formData.show_freebies_image" mode="aspectFill" width="100%" height="100%" radius="5"/>
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>贈品名稱</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.freebies_name" placeholder="請輸入贈品名稱" type="digit" :border="false"
                        input-align="right" fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>贈品庫存</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.freebies_stock" placeholder="請輸入贈品庫存" type="digit" :border="false"
                        input-align="right" fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>贈品數量</text>
            </view>
            <view class="form-value flex-right">
              <uv-number-box v-model="formData.freebies_num"
                        input-align="right" fontSize="26rpx"/>
            </view>
          </view>
        </view>
      </view>

    </view>
    <view class="submit-button safe-pb">
      <uv-button class="operation-item" @click="handleSave">保存</uv-button>
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
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
