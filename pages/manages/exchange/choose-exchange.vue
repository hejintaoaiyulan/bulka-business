<script setup>
import {getGoodsTypes, goodsList} from "../../../api/goods";
import { onShow, onLoad, onReachBottom } from '@dcloudio/uni-app'
import {usePageLoading} from "../../../hooks";
import {ref} from "vue";
import {pick} from "lodash";
import PickerSelect from "../../../components/PickerSelect.vue";
import {Toast} from "../../../utils";

const { reload, loadNext, dataList } = usePageLoading( goodsList,{
  onFinish: uni.stopPullDownRefresh
})

const types = ref([])

const selection = ref([])
const oldSelectionData = ref([])

const requestParams = ref({
  goods_name: '',
  goods_type_id: '',
  goods_type_name: ''
})

const getTypes = () => {
  getGoodsTypes().then(res => {
    types.value = (res.data || []);
    types.value.unshift({id: '', goods_type_name: '全部类型' })
  })
}

const search = () => {
  reload(pick(requestParams.value, ['goods_name', 'goods_type_id']));
}

onShow(() => {
  search()
  getTypes()
})

onLoad((query) => {
  if(query?.isEdit === '1') {
    const list = uni.getStorageSync('exchange-goods-list')
    uni.removeStorageSync('exchange-goods-list')
    if(list) {
      oldSelectionData.value = list
      selection.value = list.map(item => item.id)
    }
  }
})

const handleSetType = (val) => {
  requestParams.value.goods_type_id = val.id;
  requestParams.value.goods_type_name = val.goods_type_name
  search()
}

const handleSelectId = (val) => {
  console.log(val)
}

const handleSubmit = () => {
  if(!selection.value.length) {
    return Toast.info('請選擇商品')
  }
  const data = dataList.value.filter(item => {
    return selection.value.includes(item.id)
  })
  const oldList = oldSelectionData.value.filter(item => {
    return selection.value.includes(item.id) && data.every(o => o.id !== item.id)
  })

  uni.$emit('exchange-goods', [...data, ...oldList])
  uni.navigateBack({})
}

</script>

<template>
<view class="container">
  <view class="header">
    <view class="search-box">
      <view class="left-search">
        <uv-input v-model="requestParams.goods_name" placeholder="請輸入商品名稱" prefixIcon="search" fontSize="28rpx" style="width: 100%" :border="false" @confirm="search" />
      </view>
      <PickerSelect :options="types" key-name="goods_type_name" @change="handleSetType">
        <view class="right-search">
          <view>{{requestParams.goods_type_name || '選擇商品分類'}}</view>
          <text class="iconfont icon-arrow-right-copy"></text>
        </view>
      </PickerSelect>
    </view>
  </view>
  <scroll-view :scroll-y="true" style="flex: 1; height: 100%; overflow: hidden" @scrolltolower="loadNext">
    <view class="content">
      <uv-checkbox-group @change="handleSelectId" v-model="selection">
        <view class="goods-item" v-for="goods in dataList" :key="goods.id">
          <view class="goods-checkbox">
            <uv-checkbox shape="circle" :name="goods.id"></uv-checkbox>
          </view>
          <view class="goods-content">
            <view class="goods-img">
              <image :src="goods.goods_image" mode="aspectFit" style="width: 100rpx; height: 100rpx" />
            </view>
            <view class="goods-msg">
              <view class="goods-title">
                {{goods.goods_name}}
              </view>
              <view class="goods-tip">{{goods.goods_desc}}</view>
              <view class="goods-price">
                <view class="price">HK$ {{goods.sale_price}}</view>
                <view class="inventory">
                  <text>銷量{{goods.sales}}</text>
                  <text>|</text>
                  <text>庫存{{goods.goods_stock}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </uv-checkbox-group>
    </view>
  </scroll-view>
  <view class="submit-button safe-pb">
    <uv-button class="operation-item" @click="handleSubmit">保存</uv-button>
  </view>
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
.left-search {
  background-color: #fff;
  border-radius: 10rpx;
  flex: 1;
}
.header {
  flex: none;
  //background-color: #fff;
  position: sticky;
  top: 0;
  padding: 30rpx;
  flex: none;
  column-gap: 20rpx;
}

.search-box {
  display: flex;
  column-gap: 20rpx;
  align-items: center;
  justify-content: space-between;
}

.right-search {
  font-size: 28rpx;
  flex: none;
  color: #333;
  border-radius: 10rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 17rpx 10rpx;
  width: 250rpx;

  .iconfont {
    transform: rotate(90deg);
  }
}

.content {
  padding-left: 30rpx;
  padding-right: 30rpx;
  flex: 1;
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
      .inventory {
        color: #888;
        font-size: 26rpx;
        display: flex;
        column-gap: 10rpx;
      }
    }
  }
}

.submit-button {
  padding-top: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
  flex: none;
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
