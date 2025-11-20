<script setup>
import {onUnmounted, ref} from 'vue'
import {usePageLoading} from "../../hooks";
import {AcceptOrder, cancelOrder, getOrderList, ServingFood, stopOrderPush} from "../../api/order";
import {onShow,onHide} from '@dcloudio/uni-app'
import {showModal, Toast} from "../../utils";
import UvImage from "../../uni_modules/uv-image/components/uv-image/uv-image.vue";

const storeTab = [
  {
    name: '全部',
    key: 0
  },
  {
    name: '待支付',
    key: 1
  },
  {
    name: '待接單',
    key: 2
  },
  {
    name: '待出餐',
    key: 3
  },
  {
    name: '待取餐',
    key: 4
  },
  {
    name: '已完成',
    key: 5
  },
  {
    name: '已取消',
    key: 6
  }
]

const topTab = ref([
  {
    name: '門店堂食',
    key: 1
  },
  {
    name: '門店自取',
    key: 2
  }
])
const tabs = ref(storeTab)
const statusTab = ref(0)
const typeTab = ref(0)

const {loadNext, reload, getData, dataList} = usePageLoading(getOrderList, {
  onFinish: uni.stopPullDownRefresh,
  transform: (d) => {
    return d.map(item => {
      item.goods = item.goods.slice(0,4)
      return item
    })
  }
})

onShow(() => {
  uni.$on('newOrder', () => {
    console.log('收到新訂單通知')
    search()
  })
})

onUnmounted(() => {
  uni.$off('newOrder')
})

onHide(() => {
  uni.$off('newOrder')
})


const requestParams = ref({
  order_type: 1,
  status: ''
})

const search = () => {
  reload(requestParams.value)
}

onShow(() => {
  search()
})

const handleChangeTab = ({key}) => {
  requestParams.value.status = key ? key : ''
  search()
}
const handleChangeType = ({key}) => {
  requestParams.value.order_type = key
  search()
}

const handleToInfo = (order) => {
  uni.navigateTo({
    url: '/pages/orders/order-info?order_no=' + order.order_no
  })
}

const handleConnect = (order, evt) => {
  if(evt) {
    evt?.stopPropagation()
  }
  // 聯繫客戶
  if(order.user?.mobile)
  uni.makePhoneCall({
    phoneNumber: order.user?.mobile,
  })
}

const handleServingFood = (order,evt) => {
  if(evt) {
    evt?.stopPropagation()
  }
  // 出餐
  showModal('是否確定出餐').then(() => {
    ServingFood({order_no: order.order_no}).then(() => {
      search()
    })
  }).catch(() => {
  })
}

const handleAccept = (order, evt) => {
  if(evt) {
    evt?.stopPropagation()
  }
  // 接單
  showModal('是否確定接單').then(() => {
    AcceptOrder({order_no: order.order_no}).then(() => {
      search()
    })
  })
}

const handleCancel = (order, evt) => {
  if(evt) {
    evt?.stopPropagation()
  }
  // 取消訂單
  showModal('是否確定取消訂單').then(() => {
    cancelOrder({order_no: order.order_no}).then(() => {
      search()
    })
  })
}

const handleStopPush = (order, evt) => {
  if(evt) {
    evt?.stopPropagation()
  }
  // 停止推送
  showModal('是否確定停止消息推送').then(() => {
	  console.log(order)
    stopOrderPush({order_no: order.order_no}).then(() => {
      Toast.success('操作成功')
      search()
    }).catch(err => {
		console.log(err)
	})
  })
}

</script>

<template>
  <view class="container">
    <view class="header">
      <view class="top-tabs">
        <uv-tabs :list="topTab" :scrollable="false" item-style="background-color: #000;color: #fff; height: 90rpx"
                 lineColor="transparent" :active-style="{color: '#fff'}" :inactive-style="{color: '#b4b4b4'}"
                 v-model="typeTab" @click="handleChangeType"></uv-tabs>
      </view>
      <uv-tabs :list="tabs" line-color="#c74336" v-model="statusTab" @change="handleChangeTab"></uv-tabs>
    </view>
    <scroll-view :scroll-y="true" class="content" @scrolltolower="loadNext">
      <view style="padding: 20rpx">
        <view class="empty" v-if="!dataList.length">暫無訂單數據</view>
        <view class="order-item" v-for="order in dataList" :key="order.order_no">
          <view  @click="handleToInfo(order)">
            <view class="order-title">
              <view class="user">
                <uv-avatar :src="order.user?.avatar" :size="30"/>
                <text>{{ order.user?.nickname }}</text>
              </view>
              <view class="status">{{ order.status_txt }}</view>
            </view>
            <view class="order-content" style="margin: 20rpx 0">
              <view class="order-single-msg" v-if="order.goods.length === 1" v-for="goods in order.goods"
                    :key="goods.goods_id">
                <view class="order-img">
                  <uv-image :src="goods.goods_image" mode="aspectFit"
                            width="100rpx" height="100rpx" />
                </view>
                <view class="order-msg">
                  <view class="order-title">{{ goods.goods_name }}</view>
                  <view class="order-tip">
                    {{ goods.goods_spec_name }}
                  </view>
                </view>
              </view>
              <view v-else class="order-multiple-msg">
                <view class="goods-item" v-for="goods in order.goods" :key="goods.goods_id">
                  <view class="order-img">
                    <image :src="goods.goods_image" mode="aspectFit"
                           style="width: 100rpx; height: 100rpx"/>
                  </view>
                  <view class="goods-title">{{ goods.goods_name }}</view>
                </view>
              </view>
              <view class="price-msg">
                <view class="price">HK$ {{ order.price }}</view>
                <view class="count">共{{ order.goods_count }}件</view>
              </view>
            </view>
          </view>
          <view class="order-operation">
            <view class="order-time">{{ order.createtime }}</view>
            <view class="order-btns" v-if="![5,6].includes(order.status)" @click="handleOperation">
              <uv-button size="small" v-if="order.push_status === 0" @click="handleStopPush(order, $event)">停止推送</uv-button>
              <uv-button size="small" v-if="[1,2,3].includes(order.status)" @click="handleCancel(order, $event)">取消訂單</uv-button>
              <uv-button size="small" v-if="order.status === 2" @click="handleAccept(order, $event)">接單</uv-button>
              <uv-button size="small" v-if="order.status === 3" @click="handleServingFood(order, $event)">確認出餐</uv-button>
              <uv-button size="small" v-if="order.status === 4" @click="handleConnect(order, $event)">聯繫客戶領取</uv-button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
:global(page) {
  height: 100%;
}

.top-tabs {
  background-color: #fff;
  color: #fff;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
}

.header {
  //position: sticky;
  //top: 0;
  //left: 0;
  background-color: #f8f8f8;
  padding-bottom: 10rpx;
  z-index: 100;
}

.order-item {
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .order-title {
    display: flex;
    justify-content: space-between;

    .user {
      display: flex;
      align-items: center;
      column-gap: 10rpx;
      color: #333;
    }

    .status {
      color: #999;
      font-size: 24rpx;
    }
  }

  .order-content {
    display: flex;
    column-gap: 50rpx;
  }

  .order-single-msg {
    display: flex;
    column-gap: 20rpx;
    flex: 1;

    .order-img {
      border-radius: 10rpx;
    }

    .order-tip {
      color: #999;
      font-size: 24rpx;
    }
  }

  .order-multiple-msg {
    display: flex;
    column-gap: 20rpx;
    flex: 1;

    .goods-item {
      width: 100rpx;

      .goods-title {
        white-space: nowrap;
        font-size: 26rpx;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .order-title {
    font-size: 28rpx;
  }

  .price-msg {
    font-size: 26rpx;
    white-space: nowrap;
    flex: none;

    .price {
      color: #c74336;
    }
  }

  .order-operation {
    padding: 20rpx 0;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .order-time {
      font-size: 26rpx;
    }
  }

  .order-btns {
    display: flex;
    column-gap: 20rpx;
  }
}

.container {
  background-color: #f8f8f8;
  height: 100%;
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}

.empty {
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
}
</style>
