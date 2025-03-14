<script setup>
import {ref} from 'vue'
import {onShow, onPullDownRefresh} from '@dcloudio/uni-app'
import {usePageLoading} from "../../../hooks";
import {delExchange, getExchangeList, overExchange} from "../../../api/exchange";
import {ActivityStatus} from "../../../utils/fields";

const { dataList, getData, delItem, reload, loadNext } = usePageLoading(getExchangeList, {
  onFinish: uni.stopPullDownRefresh
})

const requestParams = ref({
  activity_name: '',
  status: ''
})

const tabs = ref([
  {name: '全部', key: ''},
  {name: '未開始', key: 1},
  {name: '進行中', key: 2},
  {name: '已下架', key: 3},
  {name: '已結束', key: 4},
])

const search = () => {
  reload(requestParams.value)
}


onShow(() => {
  search()
})

onPullDownRefresh(() => {
  search()
})

const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/manages/exchange/add-exchange'
  })
}

const handleRemove = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否删除该商品？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        delExchange({id: val.id }).then(() => {
          delItem(val.id)
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

const handleOut = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否下架此換購活動？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        overExchange({id: val.id, status: 3}).then(() => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

// 下架
const handleStop = (val) => {
  uni.showModal({
    title: '提示',
    content: '是否結束此換購活動？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        overExchange({id: val.id, status: 4}).then(() => {
          getData(requestParams.value, true)
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

const handleChangeStatus = (val) => {
  requestParams.value.status = val.key
  search()
}

const handleEdit = (val) => {
  console.log(val)
  uni.navigateTo({
    url: '/pages/manages/exchange/add-exchange?id=' + val.id
  })
}

</script>

<template>
  <view class="container">
    <view class="header">
      <view class="search">
        <uv-input v-model="requestParams.activity_name" clearable prefix-icon="search" placeholder="請輸入活動名稱" :border="false" @confirm="search" />
      </view>
      <view class="tabs">
        <uv-tabs :list="tabs" line-color="#c74336" :scrollable="false" @change="handleChangeStatus"></uv-tabs>
      </view>
    </view>
    <scroll-view :scroll-y="true" style="flex: 1;overflow: hidden;"  @scrolltolower="loadNext">
      <view class="content">
        <view class="empty" v-if="!dataList.length">
          暂无数据
        </view>
        <view class="promotion-item" v-for="item in dataList" :key="item.id">
          <view class="promotion-title">
            <view class="name">{{item.activity_name}}</view>
            <view class="status">
              <uv-tags :text="ActivityStatus.map.get(item.status)" plain size="mini" type="primary"></uv-tags>
            </view>
          </view>
          <view class="promotion-time">
            <text>活動商品：{{item.goods_count}}件</text>
          </view>
          <view class="promotion-time">
            <text>活動時間： {{item.start_time}} 至 {{item.end_time}}</text>
          </view>
          <view class="promotion-operation">
            <uv-button class="operation-item" @click="handleRemove(item)">
              <text>刪除</text>
            </uv-button>
            <uv-button class="operation-item" @click="handleEdit(item)" v-if="[3,4].includes(item.status)">
              <text>重新编辑</text>
            </uv-button>
            <uv-button class="operation-item" @click="handleOut(item)" v-if="item.status === 2">
              <text>下架</text>
            </uv-button>
            <uv-button class="operation-item" @click="handleStop(item)" v-if="item.status !== 4">
              <text>結束</text>
            </uv-button>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="submit-button safe-pb">
      <uv-button @click="handleAdd">新增換購活動</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
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
  //flex: 1;
  //overflow-y: auto;
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

.empty {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
}
</style>
