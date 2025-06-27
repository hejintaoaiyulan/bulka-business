<script setup>
import {onLoad, onShow} from '@dcloudio/uni-app'
import {ref, unref, toRef} from "vue";
import UvDatetimePicker
  from "../../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.vue";
import dayjs from "dayjs";
import {pick} from "lodash";
import {getDiscountActivityInfo, updateDiscountActivity} from "../../../api/discount";
import {Toast} from "../../../utils";
import {useUserStore} from "@/model/user";

const startTimePicker = ref()
const endTimePicker = ref()
const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const userStore = useUserStore()

// 活动商品限制数据
const shopConfig = toRef(userStore.shopConfig, 'shopConfig')

const formData = ref({
  activity_name: '',
  start_time: dayjs().valueOf(),
  end_time: '',
  goods: []
})

const getInfo = (id) => {
  getDiscountActivityInfo({id}).then(res => {
    formData.value = res.data || { goods: [] }

    formData.value.goods = formData.value.goods.map(item => {
      item.show_goods_image = item.base_url + item.goods_image
      item.show_freebies_image = item.base_url + item.freebies_image
      return {...item}
    })
    console.log(formData.value.goods)
  })
}

onLoad((query) => {
  if(query?.id) {
    getInfo(query.id)
    uni.setNavigationBarTitle({
      title: '編輯優惠活動'
    })
  }
})

onShow(() => {
  uni.$off('addGoods')
  uni.$off('editGoods')
  uni.$on('addGoods', (d) => {
    formData.value.goods.push(d)
  })
  uni.$on('editGoods', (d) => {
    formData.value.goods = formData.value.goods.map(item => {
      if ((item.id === d.id && item.id) || (item._id === d._id && item._id)) {
        return d
      }
      return item
    })
  })
})

const handleToAddGoods = () => {
  if(shopConfig.value.discount_activity_max_count) {
    if(formData.value.goods.length >= shopConfig.value.discount_activity_max_count) {
      return Toast.info(`最多只能添加${shopConfig.value.discount_activity_max_count}件商品`)
    }
  }
  uni.navigateTo({
    url: '/pages/manages/promotions/add-goods',
  })
}

const handleSetStartTime = (evt) => {
  // console.log(evt)
  formData.value.start_time = evt.value
}

const handleSetEndTime = (evt) => {
  // console.log(evt)
  formData.value.end_time = evt.value
}

const handleRemoveGoods = (goods) => {
  uni.showModal({
    title: '提示',
    content: '确定删除此商品吗？',
    success(res) {
      if (res.confirm) {
        formData.value.goods = formData.value.goods.filter(item => (item._id !== goods._id && item._id) || (item.id !== goods.id && item.id))
      }
    }
  })
}

const handleEditGoods = (goods) => {
  uni.setStorageSync('PromotionGoods', JSON.parse(JSON.stringify(goods)))
  uni.navigateTo({
    url: '/pages/manages/promotions/add-goods?isEdit=1',
    success: () => {

    }
  })
}

const handleSubmit = () => {
  const goodsFields = ['discount_activity_id', 'id', 'goods_image', 'goods_name', 'goods_desc', 'original_price', 'sale_price', 'goods_stock', 'freebies_image', 'freebies_name', 'freebies_stock', 'freebies_num']
  const saveParams = unref(formData.value)
  if(!saveParams.goods?.length) {
    return Toast.info('请添加商品')
  }
  saveParams.goods = saveParams.goods.map(item => {
    return pick(item, goodsFields)
  })
  saveParams.start_time = dayjs(saveParams.start_time).format(timeFormat)
  saveParams.end_time = dayjs(saveParams.end_time).format(timeFormat)
  updateDiscountActivity(pick(saveParams,['id','activity_name', 'start_time', 'end_time', 'goods'])).then(res => {
    uni.redirectTo({
      url: '/pages/manages/promotions/save-success'
    })
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
              <uv-input v-model="formData.activity_name" placeholder="請輸入活動名稱" :border="false"
                        input-align="right" fontSize="26rpx"/>
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
        </view>
      </view>
      <view class="card">
        <view class="card-title">
          <view>活動商品</view>
          <view class="setting-mode" @click="handleToAddGoods">添加商品</view>
        </view>
        <view class="card-form">
          <!--          <view class="empty">暫無商品，快去上傳吧</view>-->
          <view class="card" style="padding: 0" v-for="(item, i) in formData.goods" :key="i">
            <view class="title">
              <view>{{ i + 1 }}号商品</view>
              <view class="card-option">
                <view @click="handleRemoveGoods(item)">
                  <text>删除商品</text>
                  <text class="iconfont icon-yichu1"></text>
                </view>
                <view @click="handleEditGoods(item)">
                  <text>重新编辑</text>
                  <text class="iconfont icon-bianji"></text>
                </view>
              </view>
            </view>
            <view class="order-content">
              <view class="order-single-msg">
                <view class="order-img">
                  <image :src="item.show_goods_image" mode="aspectFit"
                         style="width: 100rpx; height: 100rpx"/>
                </view>
                <view class="order-msg">
                  <view class="order-title">{{ item.goods_name }}</view>
                  <view class="order-tip">
                    {{ item.goods_desc }}
                  </view>
                  <view class="price-msg">
                    <view class="price">换购价 HK$ {{ item.sale_price }}</view>
                  </view>
                </view>
              </view>
              <view class="price-msg">
                <view class="count">库存{{ item.goods_stock }}件</view>
              </view>
            </view>

            <template>
              <view class="title">贈品</view>
              <view class="gift-item">
                <view class="gift-img">
                  <image :src="item.show_freebies_image" mode="aspectFit"
                         style="width: 90rpx; height: 90rpx"/>
                </view>
                <view class="gift-content">
                  <view class="gift-title">{{ item.freebies_name }}</view>
                  <view class="gift-count">* {{ item.freebies_num }}</view>
                </view>
              </view>
            </template>
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

.card-form {
  .card {
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    padding-bottom: 40rpx !important;

    &:last-child {
      border-bottom: none;
    }
  }
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

.title {
  padding: 20rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 27rpx;

  .card-option {
    display: flex;
    align-items: center;
    column-gap: 24rpx;

    > view {
      display: flex;
      align-items: center;
      column-gap: 6rpx;
    }
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

.gift-item {
  display: flex;
  column-gap: 20rpx;
  font-size: 26rpx;
  align-items: center;

  .gift-count {
    color: #666;
  }
}

.order-content {
  display: flex;
  column-gap: 50rpx;
  margin-bottom: 20rpx;
}

.order-single-msg {
  display: flex;
  flex: 1;
  column-gap: 20rpx;

  .order-img {
    border-radius: 10rpx;
  }

  .order-tip {
    color: #999;
    font-size: 24rpx;
  }
}

.order-title {
  font-size: 28rpx;
}

.price-msg {
  font-size: 26rpx;
  white-space: nowrap;

  .price {
    color: #c74336;
  }

  .count {
    color: #999;
    font-size: 24rpx;
  }
}


.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
