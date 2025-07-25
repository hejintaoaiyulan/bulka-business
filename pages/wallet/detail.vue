<script setup>
import {ref} from 'vue'
import {onLoad, onShow, onPullDownRefresh, onReachBottom} from '@dcloudio/uni-app'
import {usePageLoading} from "@/hooks";
import {sellerOrder} from "@/api/wallet";
import {omit} from "lodash";

const {dataList, loadNext, reload, pageParams} = usePageLoading(sellerOrder, {
  onFinish: uni.stopPullDownRefresh
})

const queryParams = ref({
  key_word: '',
  settled_date: '',
  settled_id: '',
})

const getData = () => {
  reload(omit({
    ...queryParams.value,
    start_date: queryParams.value.settled_date,
    end_date: queryParams.value.settled_date,
  }, ['settled_date']))
}

const handleToOrder = (item) => {
  uni.navigateTo({
    url: '/pages/orders/order-info?order_no=' + item.order_no
  })
}

onLoad((query) => {
  // 页面加载时的逻辑
  queryParams.value.settled_date = query?.settled_date
  queryParams.value.settled_id = query?.id
  getData()
})

onReachBottom(() => {
  // 滚动到底部时加载更多数据
  loadNext()
})

onPullDownRefresh(() => {
  getData()
})
</script>

<template>
  <view class="container safe-pb">
    <view class="content">
      <view class="header">
        <view class="search">
          <uv-input v-model="queryParams.key_word" prefix-icon="search" placeholder="请输入订单编号、商品名称、所属用户"
                    clearable @confirm="getData" @clear="()=> {
                      queryParams.key_word = '';
                      getData()
                    }"/>
        </view>
        <view class="search-box">
          <text>结算日期：{{ queryParams.settled_date }}</text>
          <text>共{{ pageParams.total }}笔订单</text>
        </view>
      </view>

      <view class="order-list">
        <view class="card" v-for="item in dataList" :key="item.id">
          <view class="card-content">
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">订单编号：</view>
                <view class="msg-item-value">{{ item.order_no }}</view>
              </view>
              <view class="msg-item-right red">{{ item.price }}</view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">订单类型：</view>
                <view class="msg-item-value">{{ item.order_type_txt }}</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">商品名称：</view>
                <view class="msg-item-value">{{ item.goods_name.join('|') }}</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">所属用户：</view>
                <view class="msg-item-value">{{ item.nickname }}</view>
              </view>
            </view>
            <view class="msg-item">
              <view class="msg-item-left">
                <view class="msg-item-label">完成时间：</view>
                <view class="msg-item-value">{{ item.ovre_time }}</view>
              </view>
              <view class="msg-item-right toDetail" @click="handleToOrder(item)">查看详情</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.container {
  height: 100%;
  background: #f8f8f8;
}

.content {
  padding: 20rpx;
}

.toDetail {
  color: #007aff;
  font-size: 24rpx;
}

.header {
  position: sticky;
  z-index: 10;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.search-box {
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 50rpx;
}

.search {
  padding: 10rpx;
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
  }
}

.msg-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10rpx;
  color: #333;
  font-size: 26rpx;
  line-height: 46rpx;

  .msg-item-left {
    display: flex;
    align-items: center;
    column-gap: 10rpx;
  }

  .red {
    color: #e64340;
  }
}
</style>