<script setup>
import { onLoad } from '@dcloudio/uni-app'
import {ref, computed, unref} from "vue";
import {getGoodsInfo} from "../../../api/goods";
import UvPopup from "../../../uni_modules/uv-popup/components/uv-popup/uv-popup.vue";
import UvInput from "../../../uni_modules/uv-input/components/uv-input/uv-input.vue";
import {Toast} from "../../../utils";

const popUp = ref()

const formData = ref({

})

const singleForm = ref({
  price: '',
  max_stock: 1,
  stock: 1
})

const activeForm = ref({
  sale_price: '',
  max_stock: 1,
  stock: ''
})

onLoad((query) => {
  if(query.id && !query.isEdit) {
    getInfo(query.id)
  }
  if(query.isEdit?.toString() === '1') {
    // 赋值本地数据
  }
})

const isSingle = computed(() => {
  return formData.value.goods_spec_type === 1
})

const getInfo = (id) => {
  getGoodsInfo({id}).then(res => {
    console.log(res)
    formData.value = res.data || {}
    formData.value.show_goods_image = formData.value.base_url + formData.value.goods_image
  })
}

// 移除当前商品
const handleRemoveGoods = () => {
  uni.showModal({
    title: '移除商品',
    content: '确认移除该换购商品吗?',
    success: (result) => {
      if(result.confirm) {
        uni.$emit('remove-goods', formData.value.id)
        uni.navigateBack({})
      }
    }
  })
}

// 编辑规格
const handleEditAttr = (val, opt) => {
  popUp.value?.open()
  activeForm.value = unref(opt)
  activeForm.value.max_stock = activeForm.value.max_stock || 1
}

// 修改規格
const handleSaveAttr = () => {
  if(!activeForm.value.sale_price) {
    return Toast.info('請輸入換購價格')
  }
  if(!activeForm.value.max_stock) {
    return Toast.info('請輸入限購數量')
  }
  if(!activeForm.value.stock) {
    return Toast.info('請輸入庫存數量')
  }
  formData.value.goods_spec = formData.value.goods_spec.map(spec => {
    spec.goods_spec_attr = spec.goods_spec_attr.map(item => {
      if(item.id === activeForm.value.id) {
        return {...item, ...activeForm.value}
      }
      return item
    })
    return spec
  })
  popUp.value?.close()
  activeForm.value.sale_price = ''
  activeForm.value.max_stock = ''
  activeForm.value.stock = ''
}

const handleSubmit = () => {
  if(formData.value.goods_spec_type === 2) {

    const goods = []
    formData.value.goods_spec.forEach(spec => {
      spec.goods_spec_attr.forEach(item => {
        const obj = {
          goods_id: formData.value.id,
          price: item.sale_price,
          goods_spec_attr_id: item.id,
          max_stock: item.max_stock || 1,
          stock: item.stock,
        }
        goods.push(obj)
      })
    })

    const minPrice = Math.min(...goods.map(item => +item.price))
    // 多规格
    const goodsItem = {
      ...formData.value,
      _editend: true,
      sale_price: minPrice
    }

    uni.$emit('edit-exchange-goods', goodsItem, goods)
    uni.navigateBack({})
  }
  if(formData.value.goods_spec_type === 1) {
    const goodsItem = {
      ...formData.value,
      _editend: true,
      sale_price: singleForm.value.price
    }
    if(!singleForm.value.price){
      return Toast.info('請輸入換購價格')
    }
    const goods = [{goods_id: formData.value.id, goods_spec_attr_id: 0,...singleForm.value }]
    uni.$emit('edit-exchange-goods', goodsItem, goods)
    uni.navigateBack({})
  }
}
</script>

<template>
<view class="container">
  <view class="content">
    <view class="goods-item">
      <view class="goods-content">
        <view class="goods-img">
          <image :src="formData.show_goods_image" mode="aspectFit" style="width: 100rpx; height: 100rpx" />
        </view>
        <view class="goods-msg">
          <view class="goods-title">
            {{formData.goods_name}}
          </view>
          <view class="goods-tip">{{formData.goods_desc}}</view>
          <view class="goods-price">
            <view class="price">HK$ {{formData.sale_price}}</view>
            <view class="inventory">
              <text>銷量{{formData.sales}}</text>
              <text>|</text>
              <text>庫存{{formData.goods_stock}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="isSingle" class="card">
      <view class="card-title">換購信息</view>
      <view class="card-form">
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>換購價格</text>
          </view>
          <view class="form-value">
            <uv-input v-model="singleForm.price" placeholder="請輸入換購價格(HK$)" :border="false" input-align="right" fontSize="26rpx" type="digit" />
          </view>
        </view>
        <view class="form-item">
          <view class="form-label">
<!--            <text class="red-text">*</text>-->
            <text>限購數量</text>
          </view>
            <view class="form-value flex-right" style="column-gap: 10rpx">
              <text>最大限購</text><uv-number-box v-model="singleForm.max_stock" :step="1" :min="1"></uv-number-box>
            </view>
        </view>
        <view class="form-item">
          <view class="form-label">
            <text class="red-text">*</text>
            <text>商品庫存
            </text>
          </view>
            <view class="form-value flex-right" style="column-gap: 10rpx">
              <text>當前庫存</text>
              <uv-number-box :step="1" :min="0" v-model="singleForm.stock"></uv-number-box>
            </view>
        </view>
      </view>
    </view>
    <view v-else class="card" v-for="item in formData.goods_spec" :key="item.id">
      <view class="card-title">{{item.goods_spec_name}}</view>
      <view class="option-list">
        <view class="option" v-for="opt in item.goods_spec_attr" :key="opt.id">
          <view class="option-title">
            <view class="name">{{opt.name}}</view>
            <view class="remove-icon" @click.stop="handleEditAttr(item, opt)">
              <text class="iconfont icon-bianji"></text>
            </view>
          </view>
          <view class="option-price">
            <view class="price">HK$ {{opt.sale_price}}</view>
            <view class="inventory">庫存{{opt.stock}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="submit-button safe-pb">
    <view class="remove-tip" @click="handleRemoveGoods">移除當前換購商品</view>
    <uv-button class="operation-item" @click="handleSubmit">保存</uv-button>
  </view>

  <uv-popup mode="bottom" ref="popUp">
    <view class="pop-content">
      <view class="title">編輯換購信息</view>
      <view class="form">
        <view class="form-item">
          <uv-input placeholder="輸入換購價格（HK$）" v-model="activeForm.sale_price" />
        </view>
        <view class="form-item">
          <uv-input placeholder="輸入限購數量" v-model="activeForm.max_stock" type="number" />
        </view>
        <view class="form-item">
          <uv-input placeholder="輸入庫存數量" v-model="activeForm.stock" type="number" />
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
.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}
.remove-tip {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
}
.content {
  flex: 1;
  padding: 20rpx;
}
.goods-content {
  display: flex;
  align-items: center;
  column-gap: 20rpx;
  flex: 1;
}
.goods-item {
  margin-bottom: 20rpx;
  background-color: #fff;
  width: 100%;
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  column-gap: 20rpx;
  .goods-img {
    border-radius: 10rpx;
    image {
      vertical-align: middle;
    }
  }
  .goods-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    column-gap: 20rpx;
    .goods-title {
      color: #000;
      font-size: 30rpx;
    }
    .goods-tip {
      color: #888;
      font-size: 26rpx;
      padding: 10rpx 0;
    }
    .goods-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #f60;
        font-size: 30rpx;
      }
      .inventory {
        color: #888;
        font-size: 26rpx;
        display: flex;
        column-gap: 10rpx;
      }
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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


.submit-button {
  padding-top: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
  flex: none;
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
