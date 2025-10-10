<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import UvPopup from "../../../uni_modules/uv-popup/components/uv-popup/uv-popup.vue";
import UvInput from "../../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import {uniqueId} from "lodash";
import {Toast} from "../../../utils";
const popUp = ref()
const keyName = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十'
}
let options = {}
onLoad((query) => {
  options = query
  if(query?.type?.toString() === '1') {
    const d = uni.getStorageSync('goods_spec')
    uni.removeStorageSync('goods_spec')
    formListData.value = d
  }
})

const defaultData = {
  goods_spec_name: '',
  multiple_status: 1,
  goods_spec_attr: []
}

const activeForm = ref({
  name: '',
  original_price: '',
  sale_price: '',
  stock: ''
})

const isEditMode = ref(false)
const editingAttrId = ref(null)

const clearActiveForm = () => {
  activeForm.value = {
    name: '',
    original_price: '',
    sale_price: '',
    stock: ''
  }
  isEditMode.value = false
  editingAttrId.value = null
}

const activeSpecification = ref({})

const formListData = ref([])
const handleBack = () => {
  uni.navigateBack()
}

const handleAddItem = (val) => {
  clearActiveForm()
  popUp.value?.open()
  activeSpecification.value = val
}

const handleEditItem = (spec, attr) => {
  isEditMode.value = true
  editingAttrId.value = attr._id || attr.id
  activeForm.value = {
    name: attr.name,
    original_price: attr.original_price,
    sale_price: attr.sale_price,
    stock: attr.stock
  }
  activeSpecification.value = spec
  popUp.value?.open()
}

const handleAddSpecification = () => {
  formListData.value.push({...defaultData, _id: uniqueId()})
}

// 保存多屬性規格數據
const handleSaveAttr = () => {
  if(!activeForm.value.name) {
    return Toast.info('請輸入規格項名稱')
  }
  if(!activeForm.value.original_price) {
    return Toast.info('請輸入規格項的原價')
  }
  if(!activeForm.value.sale_price) {
    return Toast.info('請輸入規格項的售價')
  }
  if(!activeForm.value.stock) {
    return Toast.info('請輸入庫存')
  }
  
  formListData.value = formListData.value.map((item) => {
    if((item._id === activeSpecification.value._id && item._id) || (item.id === activeSpecification.value.id && item.id)) {
      if (isEditMode.value) {
        // 編輯模式：更新現有規格項
        item.goods_spec_attr = item.goods_spec_attr.map(attr => {
          if ((attr._id === editingAttrId.value && attr._id) || (attr.id === editingAttrId.value && attr.id)) {
            return {...activeForm.value, _id: attr._id || attr.id, id: attr.id}
          }
          return attr
        })
      } else {
        // 新增模式：添加新規格項
        item.goods_spec_attr = (item.goods_spec_attr || []).concat({...activeForm.value, _id: uniqueId()})
      }
      return item
    }
    return item
  })

  clearActiveForm()
  popUp.value?.close()
}

const handleRemoveAttr = (data, item) => {
  uni.showModal({
    title: '提示',
    content: `確認刪除【${item.name}】 規格選項嗎？`,
    success: (result) => {
      if(result.confirm) {
        formListData.value = formListData.value.map((dataItem) => {
          if((dataItem.id === data.id && dataItem.id) || (dataItem._id === data._id && dataItem._id) ) {
            dataItem.goods_spec_attr = dataItem.goods_spec_attr.filter(attr => (attr._id !== item._id && attr._id) || (attr.id !== item.id && attr.id))
          }
          return dataItem
        })
      }
    }
  })
}

const handleSubmit = () => {
  uni.navigateBack({
    success: () => {
      uni.$emit('updateSpecification', formListData.value)
    }
  })
}
</script>

<template>
  <view class="container">
    <uv-navbar
      title="設置商品規格"
      fixed
      bg-color="#000000"
      title-style="color: #fff"
      :safeAreaInsetTop="true"
      placeholder
      @left-click="handleBack"
      left-icon-color="#fff"
    >
      <template #right>
        <text class="add-spec" @click="handleAddSpecification">新增規格</text>
      </template>
    </uv-navbar>
    <view class="content">
      <view class="empty" v-if="!formListData.length">
        <text>暫無規格，點擊右上角添加</text>
      </view>
      <view v-for="(item, index) in formListData" :key="item.id" class="card">
        <view class="card-title">規格{{keyName[index + 1]}}</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規格名稱</text>
            </view>
            <view class="form-value">
              <uv-input customStyle="padding: 0" v-model="item.goods_spec_name" inputAlign="right" class="form-input" :border="false" placeholder="請輸入規格名稱"
                        fontSize="26rpx"/>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否支援多選</text>
            </view>
            <view class="form-value">
              <uv-radio-group custom-style="display: flex; justify-content: flex-end; gap: 20rpx" v-model="item.multiple_status">
                <uv-radio :name="2" label="是"></uv-radio>
                <uv-radio :name="1" label="否"></uv-radio>
              </uv-radio-group>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>規格選項</text>
            </view>
            <view class="form-value" @click="handleAddItem(item)">
              <text class="setting-mode">新增規格項</text>
            </view>
          </view>
        </view>
        <view class="card-title">規格選項</view>
        <view class="option-list">
          <view class="option" v-for="opt in item.goods_spec_attr" :key="opt.id">
            <view class="option-title">
              <view class="name">{{opt.name}}</view>
              <view class="option-actions">
                <view class="edit-icon" @click.stop="handleEditItem(item, opt)">
                  <text class="iconfont icon-bianji"></text>
                </view>
                <view class="remove-icon" @click.stop="handleRemoveAttr(item, opt)">
                  <text class="iconfont icon-shanchu"></text>
                </view>
              </view>
            </view>
            <view class="option-price">
              <view class="price">HK$ {{opt.sale_price}}</view>
              <view class="inventory">庫存{{opt.stock}}</view>
            </view>
          </view>
          <view class="empty" v-if="!item.goods_spec_attr?.length">
            暫無規格項，請新增
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb">
      <uv-button class="operation-item" @click="handleSubmit">儲存</uv-button>
    </view>

    <uv-popup mode="bottom" ref="popUp">
      <view class="pop-content">
        <view class="title">{{ isEditMode ? '編輯規格項' : '新增規格項' }}</view>
        <view class="form">
          <view class="form-item">
            <uv-input placeholder="輸入規格項名稱" v-model="activeForm.name" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入原價（HK$）" v-model="activeForm.original_price" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入售價（HK$）" v-model="activeForm.sale_price" />
          </view>
          <view class="form-item">
            <uv-input placeholder="輸入庫存數量" v-model="activeForm.stock" />
          </view>
          <view class="form-item">
            <uv-button class="button" @click="handleSaveAttr">確認</uv-button>
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

.empty {
  color: #999;
  font-size: 26rpx;
  text-align: center;
  padding: 60rpx 0;
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
      align-items: center;
    }
    
    .option-actions {
      display: flex;
      gap: 10rpx;
    }
    
    .edit-icon, .remove-icon {
      padding: 5rpx;
      color: #666;
      font-size: 24rpx;
    }
    
    .edit-icon {
      color: #3c9cff;
    }
    
    .remove-icon {
      color: #ff4757;
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


.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
