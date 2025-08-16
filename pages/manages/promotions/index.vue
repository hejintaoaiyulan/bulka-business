<script setup>
import {ref} from 'vue'
import {deleteDiscountActivity, downDiscountActivity, getDiscountActivityList} from "../../../api/discount";
import {usePageLoading} from "../../../hooks";
import {onShow, onPullDownRefresh} from "@dcloudio/uni-app";
import {ActivityStatus} from "../../../utils/fields";
import UvButton from "../../../uni_modules/uv-button/components/uv-button/uv-button.vue";
import UvImage from "../../../uni_modules/uv-image/components/uv-image/uv-image.vue";

const {getData, reload, dataList, delItem, loadNext } = usePageLoading(getDiscountActivityList, {
  onFinish: uni.stopPullDownRefresh,
  transform: (list) => {
    return list.map((item) => {
      item.goods =( item.goods || []).map(goods => {
        goods.show_goods_image = (goods.base_url || '') + goods.goods_image
        return goods;
      });
      return item
    })
  }
});

const requestParams = ref({
  activity_name: '',
  status: ''
})

const search = () => {
  reload(requestParams.value)
}

onShow(() => {
  search()
})

onPullDownRefresh(() => {
  search()
})

const tabs = ref([
  {name: '全部', key: 0},
  {name: '未開始', key: 1},
  {name: '進行中', key: 2},
  {name: '已下架', key: 3},
  {name: '已結束', key: 4},
])

const handleAdd = () => {
  // console.log('handleAdd')
  uni.navigateTo({
    url: '/pages/manages/promotions/add-promotion'
  })
}

const handleSelectStatus = (val) => {
  requestParams.value.status = val.key ? val.key : ''
  search()
}

const handleRemove = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否刪除該商品？',
    success: function (res) {
      if (res.confirm) {
        console.log('用戶點擊確定');
        deleteDiscountActivity({id: val.id}).then(() =>{
          delItem(val.id)
        })
      } else if (res.cancel) {
        console.log('用戶點擊取消');
      }
    }
  })
}

const handleEdit = (val) => {
  uni.navigateTo({
    url: '/pages/manages/promotions/add-promotion?id=' + val.id
  })
}

// 下架
const handleSoldOut = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否下架該活動？',
    success: function (res) {
      if (res.confirm) {
        console.log('用戶點擊確定');
        downDiscountActivity({id: val.id, status: 3}).then(res => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用戶點擊取消');
      }
    }
  })
}

// 結束
const handleOver = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否結束該活動？',
    success: function (res) {
      if (res.confirm) {
        console.log('用戶點擊確定');
        downDiscountActivity({id: val.id, status: 4}).then(res => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用戶點擊取消');
      }
    }
  })
}
</script>

<template>
  <view class="container">
    <view class="header">
      <view class="search">
        <uv-input v-model="requestParams.activity_name" prefix-icon="search" placeholder="請輸入活動名稱" :border="false" @confirm="search" clearable />
      </view>
      <view class="tabs">
        <uv-tabs :list="tabs" line-color="#c74336" :scrollable="false" @click="handleSelectStatus"></uv-tabs>
      </view>
    </view>
    <scroll-view style="flex: 1;overflow: hidden;" :scroll-y="true" @scrolltolower="loadNext">
      <view class="content">
        <view class="empty" v-if="!dataList.length">
          暫無數據
        </view>
        <view class="promotion-item" v-for="item in dataList" :key="item.id">
          <view class="promotion-title">
            <view class="name">{{item.activity_name}}</view>
            <view class="status">
              <uv-tags :text="ActivityStatus.map.get(item.status)" plain size="mini" type="primary"></uv-tags>
            </view>
          </view>
          <view class="promotion-time">
            <text>活動時間： {{item.start_time}} 至 {{item.end_time}}</text>
          </view>
          <view class="promotion-main">
            <view class="pictures">
              <view class="picture-item" v-for="goods in item.goods" :key="goods.id">
                <uv-image :src="goods.show_goods_image" mode="aspectFit" width="100rpx" height="100rpx" />
                <view>{{goods.goods_name}}</view>
              </view>

            </view>
            <view class="inventory">
              <view>銷量：{{item.sales}}</view>
              <view>庫存：{{item.stock}}</view>
            </view>
          </view>
          <view class="promotion-operation">
            <uv-button class="operation-item" @click="handleRemove(item)">
              <text>刪除</text>
            </uv-button>
            <uv-button class="operation-item" @click="handleEdit(item)">
              <text>編輯</text>
            </uv-button>
            <uv-button class="operation-item" @click="handleSoldOut(item)" v-if="item.status === 2">
              <text>下架</text>
            </uv-button>
            <uv-button class="operation-item" v-if="item.status !== 4" @click="handleOver(item)">
              <text>結束</text>
            </uv-button>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="submit-button safe-pb">
      <uv-button @click="handleAdd">新增優惠活動</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}
.empty {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
}
.promotion-item {
  margin-bottom: 25rpx;
  padding: 20rpx;
  font-size: 28rpx;
  background-color: white;
  border-radius: 10rpx;
  .promotion-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      color: #000;
    }
  }
  .promotion-time {
    font-size: 24rpx;
    color: #333;
    line-height: 60rpx;
  }
  .promotion-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    column-gap: 20rpx;
    .pictures {
      flex: 1;
      display: flex;
      column-gap: 20rpx;
      .picture-item {
        text-align: center;
        image {
          width: 100rpx;
          height: 100rpx;
        }
        line-height: 48rpx;
        font-size: 24rpx;
      }
    }
    .inventory {
      flex: none;
      font-size: 24rpx;
      color: #999;
      text-align: right;
    }
  }
  .promotion-operation {
    display: flex;
    justify-content: flex-end;
    column-gap: 10rpx;
  }
}
.search {
  width: 100%;
  background-color: #fff;
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  padding: 20rpx;
  flex: none;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20rpx;
}

.submit-button {
  flex: none;
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
}

.operation-item {
  :global(.uv-button){
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
