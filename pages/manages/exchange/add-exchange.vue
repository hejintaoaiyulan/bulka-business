<script setup>
import {ref, unref} from 'vue'
import { onShow, onLoad } from '@dcloudio/uni-app'
import dayjs from "dayjs";
import UvDatetimePicker
  from "../../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue";
import {pick} from "lodash";
import {addExchange, getExchangeDetail} from "../../../api/exchange";
import {Toast} from "../../../utils";


const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const formData = ref({
  id: '',
  activity_name: '',
  start_time: dayjs().format(timeFormat),
  end_time: '',
  min_price: '',
  goods: []
})
const startTimePicker = ref()
const endTimePicker = ref()

onLoad((query) => {
  if(query.id) {
    getInfo(query.id)
    uni.setNavigationBarTitle({
      title: '編輯換購活動'
    })
  }
})

const getInfo = (id) => {
  getExchangeDetail({id}).then(res => {
    console.log(res)
    formData.value = res.data || {}
    formData.value.show_goods = (res.data.goods || []).map(item => {
      if(item.goods_spec_type === 1) {
        return {
          ...item, sale_price: item.price || item.pirce,
          show_goods_image: item.goods_image,
          _editend: true
        }
      }
      if(item.goods_spec_type === 2) {
        return {
          ...item, sale_price: item.price || item.pirce,
          show_goods_image: item.goods_image,
          _editend: true
        }
      }
      return item
    })
    const goods = [];
    (res.data?.goods || []).forEach(goods => {
      if(goods.goods_spec_type === 2) {
        goods.goods_spec_attr.forEach(item => {
          const obj = {
            goods_id: goods.id,
            price: item.sale_price,
            goods_spec_attr_id: item.id,
            max_stock: item.max_stock || 1,
            stock: item.stock,
          }
          goods.push(obj)
        })
      }
      else {
        // 单规格的
        const obj = {
          goods_id: goods.id,
          price: goods.price,
          goods_spec_attr_id: 0,
          max_stock: goods.max_stock || 1,
          stock: goods.goods_stock,
        }
        goods.push(obj)
      }
    })
    formData.value.goods = goods
  })
}

const handleToChoose = () => {
  if(formData.value.goods.length) {
    uni.setStorageSync('exchange-goods-list', formData.value.show_goods)
  }
  uni.navigateTo({
    url: '/pages/manages/exchange/choose-exchange?isEdit=1'
  })
}

const handleToEdit = (goods) => {
  // uni.setStorageSync('edit-goods-item', goods)
  uni.navigateTo({
    url: '/pages/manages/exchange/edit-exchange-goods?id=' + goods.id
  })
}

onShow(() => {
  uni.$off('exchange-goods')
  uni.$off('edit-exchange-goods')
  uni.$off('remove-goods')
  uni.$on('exchange-goods', (d) => {
    console.log(d)
    formData.value.show_goods = d.map(item => {
      const oldObj = formData.value.show_goods?.find(t => t.id === item.id)
      return {...item, show_goods_image: item.goods_image, sale_price:oldObj?.sale_price || item.sale_price, _editend: oldObj?._editend }
    })
  })
  uni.$on('edit-exchange-goods', (d, goods) => {
    console.log(d, goods)
    formData.value.show_goods = formData.value.show_goods?.map(item => {
      if(item.id === d.id) return {...item, ...d}
      return item
    }) || []
    formData.value.goods = formData.value.goods.filter(item => item.goods_id !== d.id)
    formData.value.goods.push(...goods)
  })
  uni.$on('remove-goods', id => {
    formData.value.show_goods = formData.value.show_goods.filter(item => {
      return item.id !== id
    })
    formData.value.goods = formData.value.goods.filter(item => {
      return item.goods_id !== id
    })
  })
})

const handleSubmit = () => {
  console.log(formData.value)
  const saveParams = pick(formData.value, ['id', 'activity_name', 'end_time', 'start_time', 'goods', 'min_price'])
  saveParams.start_time = dayjs(saveParams.start_time).format(timeFormat)
  saveParams.end_time = dayjs(saveParams.end_time).format(timeFormat)

  addExchange(saveParams).then(res => {
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
        <view class="card-title">活動基本信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動名稱</text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.activity_name" placeholder="請輸入活動名稱" :border="false" input-align="right" fontSize="26rpx" />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動開始時間</text>
            </view>
            <view class="form-value" @click="startTimePicker.open()">
              <view class="placeholder">
                {{ formData.start_time ? dayjs(formData.start_time).format(timeFormat) : '請選擇活動開始時間' }}
                <text class="iconfont icon-shijian"></text>
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>活動結束時間
              </text>
            </view>
            <view class="form-value" @click="endTimePicker.open()">
              <view class="placeholder">
                {{ formData.end_time ? dayjs(formData.end_time).format(timeFormat) : '請選擇活動結束時間' }}
                <text class="iconfont icon-shijian"></text>
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>最低參與金額
              </text>
            </view>
            <view class="form-value">
              <uv-input v-model="formData.min_price" placeholder="請輸入最低參與金額" :border="false" input-align="right" fontSize="26rpx"
                        type="digit"/>
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">
          <view>換購活動</view>
        </view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text>換購商品</text>
            </view>
            <view class="form-value setting-mode" @click="handleToChoose">
              <text>請選擇換購商品</text>
              <text class="iconfont icon-arrow-right-copy"></text>
            </view>
          </view>
          <view class="goods-content-list">
            <view class="goods-item" v-for="goods in formData.show_goods" :key="goods.id">
              <view class="goods-content">
                <view class="goods-img">
                  <image :src="goods.show_goods_image" mode="aspectFit" style="width: 100rpx; height: 100rpx" />
                </view>
                <view class="goods-msg">
                  <view class="goods-title">
                    <text>{{goods.goods_name}}</text>

                  </view>
                  <view class="goods-tip">{{goods.goods_desc}}</view>
                  <view class="goods-price">
                    <view class="price">HK$ {{goods.sale_price}}</view>
                    <view class="operation" @click="handleToEdit(goods)">
                      <text class="red" v-if="!goods._editend">*请完善信息</text>
                      <text>修改信息</text>
                      <text class="iconfont icon-bianji"></text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="submit-button safe-pb">
      <uv-button class="operation-item" block @click="handleSubmit">保存</uv-button>
    </view>

    <uv-datetime-picker ref="startTimePicker" v-model="formData.start_time" :max-date="formData.end_time || undefined"
                        mode="datetime" @confirm="handleSetStartTime">
    </uv-datetime-picker>
    <uv-datetime-picker ref="endTimePicker" v-model="formData.end_time" :min-date="formData.start_time" mode="datetime"
                        @confirm="handleSetEndTime">
    </uv-datetime-picker>
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

.placeholder {
  color: #888888;
  font-size: 26rpx;
  padding: 12rpx 22rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .iconfont {
    font-size: 24rpx;
    color: #666;
  }
}

.submit-button {
  flex: none;
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
}

.setting-mode {
  color: #3c9cff;
  font-weight: normal;
  font-size: 28rpx;
}

.empty {
  text-align: center;
  padding: 40rpx 0;
  font-size: 26rpx;
  color: #666;
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
  .goods-checkbox {
    flex: none;
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
      .operation {
        font-size: 26rpx;
        display: flex;
        column-gap: 8rpx;
        align-items: center;
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

.red {
  color: #e42121;
  font-size: 24rpx;
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}

</style>
