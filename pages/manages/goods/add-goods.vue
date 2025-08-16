<script setup>
import {ref, computed, unref} from "vue";
import {onShow, onLoad} from '@dcloudio/uni-app'
import UvImage from "../../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import {useFileUpload} from "../../../utils/uploadFile";
import {getGoodsCategory, UploadUrl} from "../../../api/public";
import PickerSelect from "../../../components/PickerSelect.vue";
import {pick} from "lodash";
import {getGoodsInfo, getGoodsTypes, saveGoods} from "../../../api/goods";
import {Toast} from "../../../utils";

const {uploadFile, isUploading} = useFileUpload({showUploadLoading: true})
const types = ref([])
const categories = ref([])
const formData = ref({
  id: '',
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

onLoad((query) => {
  if (query?.id) {
    getInfo(query.id)
    uni.setNavigationBarTitle({
      title: '編輯商品'
    })
  }
})

const getInfo = (id) => {
  getGoodsInfo({id}).then(res => {
    formData.value = res.data || {}
    if (formData.value.goods_spec_type === 2) {
      formData.value.goods_spec_name = formData.value.goods_spec.map(item => item.goods_spec_name).join('、')
    }

    formData.value.show_goods_image = formData.value.base_url + formData.value.goods_image
  })
}

const getTypes = () => {
  getGoodsTypes().then(res => {
    types.value = res.data || []
  })
}

const getCategories = () => {
  getGoodsCategory().then(res => {
    categories.value = res.data || []
  })
}

const handleToSetSpecification = () => {
  let n = ''
  if (formData.value.goods_spec?.length) {
    uni.setStorageSync('goods_spec', formData.value.goods_spec)
    n = '1'
  }
  uni.navigateTo({
    url: '/pages/manages/goods/specification?type=' + n,
    success: () => {
      uni.$once('updateSpecification', (data) => {
        formData.value.goods_spec = unref(data)
        formData.value.goods_spec_name = unref(data).map(item => item.goods_spec_name).join('、')
      })
    }
  })
}

const handleChooseImage = () => {
  if (!isUploading.value)
    uploadFile({
      count: 1,
      url: UploadUrl,
      name: 'image',
      fileType: ['image']
    }).then(res => {
      console.log(res)
      const [result] = res || []
      formData.value.goods_image = result?.path
      formData.value.show_goods_image = result?.url
    }).catch(err => {
      console.log(err)
    })
}

const handleChangeType = (val) => {
  formData.value.goods_type_name = val.goods_type_name
  formData.value.goods_type_id = val.id
}

const handleChangeCategory = (val) => {
  formData.value.goods_category_id = val.id
  formData.value.goods_category_name = val.category_name
}

onShow(() => {
  getTypes()
  getCategories()
})

const discount = computed(() => {
  if (!formData.value.original_price || !formData.value.sale_price) {
    return 0
  }
  const value = +((formData.value.sale_price || 0) / (formData.value.original_price || 0) * 10).toFixed(2)
  formData.value.discount = value
  return value
})

const handleSave = () => {
  const baseFields = ['goods_image', 'id', 'goods_name', 'goods_desc', 'goods_type_id', 'goods_category_id', 'goods_spec_type', 'goods_stock', 'original_price', 'sale_price', 'discount', 'top_status', 'publish_status', 'weigh', 'goods_spec']
  const singleFields = formData.value.goods_spec_type === 1 ? baseFields.filter(key => !['goods_spec'].includes(key)) : baseFields.filter(key => !['goods_stock', 'original_price', 'sale_price'].includes(key))
  formData.value.discount = Number(formData.value.discount || 0).toFixed(2)
  const saveParams = pick(formData.value, singleFields)
  saveGoods(saveParams).then(res => {
    Toast.success('保存成功')
    setTimeout(() => {
      uni.navigateBack({})
    }, 1000)
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
              <view class="add-file-box" v-if="!formData.goods_image" @click="handleChooseImage">
                <view class="iconfont icon-jiajianzujianjiahao" v-if="!isUploading"></view>
                <view v-else class="iconfont icon-loading rotate-loading" style="display: inline-block"></view>
              </view>
              <view class="add-file-box show-picture" v-else @click="handleChooseImage">
                <uv-image :src="formData.show_goods_image" mode="aspectFit" width="100%" height="100%" radius="5"/>
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
              <text>平臺商品分類</text>
            </view>
            <PickerSelect :options="categories" key-name="category_name" @change="handleChangeCategory">
              <view class="form-value">
                <text class="placeholder">
                  {{ formData.goods_category_name || '請選擇分類' }}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </PickerSelect>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商家商品分類</text>
            </view>
            <PickerSelect :options="types" key-name="goods_type_name" @change="handleChangeType">
              <view class="form-value">
                <text class="placeholder">
                  {{ formData.goods_type_name || '請選擇分類' }}
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
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx"
                                v-model="formData.goods_spec_type" @change="formData.discount = ''">
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
                <uv-input v-model="formData.goods_stock" placeholder="請輸入商品庫存" :border="false"
                          input-align="right" fontSize="26rpx"/>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品原價</text>
              </view>
              <view class="form-value">
                <uv-input v-model="formData.original_price" placeholder="請輸入商品原價" type="digit" :border="false"
                          input-align="right" fontSize="26rpx"/>
              </view>
            </view>
            <view class="form-item">
              <view class="form-label">
                <text class="red-text">*</text>
                <text>商品售價</text>
              </view>
              <view class="form-value">
                <uv-input v-model="formData.sale_price" placeholder="請輸入商品售價" type="digit" :border="false"
                          input-align="right" fontSize="26rpx"/>
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
                <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx"
                                v-model="formData.goods_spec_type">
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
                <text class="setting-mode">{{ formData.goods_spec_name || '設置商品規格' }}</text>
              </view>
            </view>
          </template>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品折扣</text>
              <text class="form-label-tip">(超過50%折扣自動參加首頁試食活動)</text>
            </view>
            <view class="form-value">
              <text v-if="single">{{ discount }}</text>
              <uv-input v-else v-model="formData.discount" placeholder="請輸入商品折扣" type="digit" :border="false"
                        input-align="right" fontSize="26rpx"/>
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
              <uv-input v-model="formData.weigh" placeholder="請輸入商品順序" type="number" :border="false"
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

.form-label-tip {
  font-size: 20rpx;
  color: rgba(0, 0, 0, 0.6);
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
