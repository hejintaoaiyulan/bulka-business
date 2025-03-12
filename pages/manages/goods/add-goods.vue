<script setup>
import {ref, computed, unref} from "vue";
import {onShow } from '@dcloudio/uni-app'
import UvImage from "../../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import {useFileUpload} from "../../../utils/uploadFile";
import {getShopType, UploadUrl} from "../../../api/public";
import PickerSelect from "../../../components/PickerSelect.vue";

const { uploadFile } = useFileUpload({showUploadLoading: true })
const types = ref([])
const formData = ref({
  goods_image: '',
  show_goods_image: '',
  goods_name: '',
  goods_desc: '',
  goods_type_id: '',
  goods_type_name: '',
  goods_spec_type: 1,
  goods_stock: '',
  original_price: '',
  sale_price: '',
  goods_spec: [],
  discount: '',
  top_status: 2,
  publish_status: 2,
  weigh: '',
})

const single = computed(() => {
  return formData.value.goods_spec_type === 1
})

const getTypes = () => {
  getShopType().then(res => {
    types.value = res.data || []
  })
}

const handleToSetSpecification = () => {
  let n = ''
  if(formData.value.goods_spec_attr?.length) {
    uni.setStorageSync('goods_spec_attr', formData.value.goods_spec_attr)
    n = '1'
  }
  uni.navigateTo({
    url: '/pages/manages/goods/specification?type=' + n,
    success: () => {
      uni.$once('updateSpecification', (data) => {
        formData.value.goods_spec_attr = unref(data)
        formData.value.goods_spec_attr_name = unref(data).map(item => item.goods_spec_name).join('、')
      })
    }
  })
}

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

const handleChangeType = (val) => {
  formData.value.goods_type_name = val.name
  formData.value.goods_type_id = val.id
}

onShow(() => {
  getTypes()
})
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
              <uv-input v-model="formData.goods_name" inputAlign="right" class="form-input" :border="false" placeholder="請輸入商品名稱"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品描述</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.goods_desc" inputAlign="right" fontSize="26rpx" :border="false" placeholder="請輸入商品描述"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品分類</text>
            </view>
            <PickerSelect :options="types" key-name="name" @change="handleChangeType">
              <view class="form-value">
                <text class="placeholder">
                  {{formData.goods_type_name || '請選擇商品分類'}}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </PickerSelect>
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
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.goods_spec_type">
                  <uv-radio :name="1" label="單規格"></uv-radio>
                  <uv-radio :name="2" label="多規格"></uv-radio>
                </uv-radio-group>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品庫存</text>
              </view>
              <view class="form-value">
                <uv-input v-model="formData.goods_stock" placeholder="請輸入商品庫存" :border="false" input-align="right" fontSize="26rpx" />
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品原價</text>
              </view>
              <view class="form-value">
                <uv-input v-model="formData.original_price" placeholder="請輸入商品原價" type="digit" :border="false" input-align="right" fontSize="26rpx" />
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品售價</text>
              </view>
              <view class="form-value">
                <uv-input v-model="formData.sale_price" placeholder="請輸入商品售價" type="digit" :border="false" input-align="right" fontSize="26rpx" />
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
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="formData.goods_spec_type">
                  <uv-radio :name="1" label="單規格"></uv-radio>
                  <uv-radio :name="2" label="多規格"></uv-radio>
                </uv-radio-group>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品規格</text>
              </view>
              <view class="form-value flex-right" @click="handleToSetSpecification">
                <text class="setting-mode">{{formData.goods_spec_attr_name || '設置商品規格'}}</text>
              </view>
            </view>
          </template>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品折扣</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.discount" placeholder="請輸入商品折扣" type="digit" :border="false" input-align="right" fontSize="26rpx" />
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
              <uv-switch v-model="formData.top_status" :active-value="1" :inactive-value="2"></uv-switch>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否上架</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch v-model="formData.publish_status" :active-value="1" :inactive-value="2"></uv-switch>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品順序</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.weigh" placeholder="請輸入商品順序" type="number" :border="false" input-align="right" fontSize="26rpx" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb">
      <uv-button class="operation-item" >保存</uv-button>
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
