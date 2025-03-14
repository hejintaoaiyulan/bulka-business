<script setup>
import {
  onShow,
  onPullDownRefresh
} from '@dcloudio/uni-app'
import {delGoods, getGoodsTypes, goodsList, goodsPublish} from "../../../api/goods";
import {usePageLoading} from "../../../hooks";
import {ref} from "vue";
import PickerSelect from "../../../components/PickerSelect.vue";
import {PublishStatus} from "../../../utils/fields";

const {reload, dataList, loadNext, delItem, getData} = usePageLoading(goodsList, {
  loadInInit: true,
  onFinish: uni.stopPullDownRefresh
})

const types = ref([])

const requestParams = ref({
  goods_name: '',
  goods_type_id: '',
  publish_status: '',
  goods_type_name: ''
})

const list = [{
  name: '全部',
  id: -1
},
  {
    name: '未上架',
    id: 0
  },
  {
    name: '上架',
    id: 1
  },
  {
    name: '下架',
    id: 2
  }
]


const handleAddGoods = () => {
  uni.navigateTo({
    url: '/pages/manages/goods/add-goods'
  })
}

onPullDownRefresh(() => {
  search()
})

const handleRemove = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否删除该商品？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        delGoods({id: val.id}).then(res => {
          delItem(val.id)
        })
      }
    }
  })
}

// 下架
const handleSoldOut = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否下架该商品？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        goodsPublish({id: val.id, publish_status: 2}).then(res => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

// 上架
const handleSoldIn = (val, flag) => {
  uni.showModal({
    title: '提示',
      content: `是否${flag ? '重新': ''}上架该商品？`,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        goodsPublish({id: val.id, publish_status: 1}).then(res => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

const getTypes = () => {
  getGoodsTypes().then(res => {
    types.value = res.data || []
  })
}

const handleChangeSearchType = (val) => {
  requestParams.value.goods_type_id = val.id
  requestParams.value.goods_type_name = val.goods_type_name
  search()
}

const handleToEdit = (val) => {
  uni.navigateTo({
    url: '/pages/manages/goods/add-goods?id=' + val.id
  })
}

const handleChangeTab = (evt) => {
  let type = evt.id
  if(type === -1) {
    type = ''
  }
  requestParams.value.publish_status = type
  search()
}

const search = () => {
  reload(requestParams.value)
}

onShow(() => {
  search()
  getTypes()
})
</script>

<template>
  <view class="container safe-pb">
    <view class="header">
      <view class="search-box">
        <view class="left-search">
          <uv-input v-model="requestParams.goods_name" placeholder="請輸入商品名稱" prefixIcon="search" fontSize="28rpx"
                    style="width: 100%" :border="false" @confirm="search" />
        </view>
        <PickerSelect :options="types" key-name="goods_type_name" @change="handleChangeSearchType">
          <view class="right-search">
            <view>{{ requestParams.goods_type_name || '選擇商品分類' }}</view>
            <text class="iconfont icon-arrow-right-copy"></text>
          </view>
        </PickerSelect>
      </view>
      <view class="tabs">
        <uv-tabs :list="list" line-color="#c74336" :scrollable="false" @change="handleChangeTab"></uv-tabs>
      </view>
    </view>
    <view class="content">
      <scroll-view :scroll-y="true" style="height: 100%;overflow: hidden;" @scrolltolower="loadNext" enhanced :show-scrollbar="false">
        <view class="goods-list">
          <view class="goods-item" v-for="item in dataList" :key="item.id">
            <view class="goods-title">
              <view class="goods-tag">
                {{ item.goods_type_name }}
              </view>
              <view class="goods-status" :class="{is_stock_status_error: item.stock_status === 2}">
                <text>{{ PublishStatus.map.get(item.publish_status) || '未知分类' }}</text>
                <text v-if="item.stock_status === 2"> | 库存不足</text>
              </view>
            </view>
            <view class="goods-content">
              <view class="goods-img">
                <image :src="item.goods_image" mode="aspectFit"/>
              </view>
              <view class="goods-msg">
                <view class="goods-name">{{ item.goods_name }}</view>
                <view class="goods-tip">{{ item.goods_desc }}</view>
                <view class="goods-price">
                  <view class="price">HK$ {{ item.sale_price }}</view>
                  <view class="inventory">
                    <text>銷量{{ item.sales }}</text>
                    <text>|</text>
                    <text>庫存{{ item.goods_stock }}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="goods-operation">
              <uv-button class="operation-item" @click="handleRemove(item)">
                <text>刪除</text>
              </uv-button>
              <uv-button class="operation-item" @click="handleToEdit(item)">
                <text>編輯</text>
              </uv-button>
              <uv-button v-if="item.publish_status === 1" class="operation-item" @click="handleSoldOut(item)">
                <text>下架</text>
              </uv-button>
              <uv-button v-if="item.publish_status === 0" class="operation-item" @click="handleSoldIn(item)">
                <text>上架</text>
              </uv-button>
              <uv-button v-if="item.publish_status === 2" class="operation-item" @click="handleSoldIn(item, true)">
                <text>重新上架</text>
              </uv-button>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="footer">
      <uv-button @click="handleAddGoods">新增商品</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.goods-list {
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  row-gap: 15rpx;

  .goods-item {
    border-radius: 10rpx;
    background-color: #fff;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    row-gap: 10rpx;

    .goods-title {
      display: flex;
      justify-content: space-between;

      .goods-tag {
        padding: 5rpx 20rpx;
        background-color: #5976cc;
        border-radius: 10rpx;
        color: #fff;
        font-size: 26rpx;
      }

      .goods-status {
        color: #3c9cff;
        font-size: 26rpx;
      }
    }

    .goods-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 10rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .goods-content {
      display: flex;
      column-gap: 10rpx;
    }

    .goods-msg {
      display: flex;
      flex: 1;
      flex-direction: column;

      .goods-tip {
        color: #999;
        font-size: 24rpx;
        line-height: 45rpx;
      }

      .goods-price {
        display: flex;
        justify-content: space-between;

        .price {
          font-size: 28rpx;
          color: #c74336;
        }

        .inventory {
          font-size: 24rpx;
          color: #999;
          display: flex;
          column-gap: 10rpx;
        }
      }
    }

    .goods-operation {
      padding: 15rpx 0;
      display: flex;
      justify-content: flex-end;
      column-gap: 20rpx;
      text-align: right;
    }
  }
}

.is_stock_status_error {
  color: #c74336 !important;
}
.container {
  //padding: 30rpx;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}

.footer {
  flex: none;
  padding: 30rpx;
}

.left-search {
  flex: 1;
}

.header {
  background-color: #fff;
  position: sticky;
  top: 0;
  padding: 30rpx;
  flex: none;
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
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 10rpx;
  width: 250rpx;

  .iconfont {
    transform: rotate(90deg);
  }
}

.tabs {
  width: 100%;
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
