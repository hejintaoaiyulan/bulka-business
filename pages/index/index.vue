<template>
  <PageWrapper>
    <view class="content">
      <uv-navbar title="" bg-color="#000000" left-icon-color="#ffffff" leftText="店鋪詳情" safeAreaInsetTop placeholder
                 fixed
                 leftIcon="">
        <template #right>
          <view class="right" @click="handleRight">
            <text class="iconfont icon-saoma"></text>
          </view>
        </template>
      </uv-navbar>
      <view class="header-bg"></view>
      <view class="main">
        <view class="top-statictis">
          <view class="title-statictis">
            <view class="title-name">數據統計</view>
            <view class="title-operation" @click="handleMore">查看更多</view>
          </view>
          <view class="grid">
            <view class="grid-item">
              <view class="tip">今日營業額(HK$)</view>
              <view class="count">{{ info.sales_price }}</view>
            </view>
            <view class="grid-item">
              <view class="tip">今日訂單量</view>
              <view class="count">{{ info.order_num }}</view>
            </view>
            <view class="grid-item">
              <view class="tip">今日結算訂單</view>
              <view class="count">{{ info.today_settled_num }}</view>
            </view>
            <view class="grid-item">
              <view class="tip">今日已售商品(件)</view>
              <view class="count">{{ info.sales_num }}</view>
            </view>
            <view class="grid-item">
              <view class="tip">今日訪客(人)</view>
              <view class="count">{{ info.shop_uv }}</view>
            </view>
            <view class="grid-item">
              <view class="tip">今日結算金額(HK$)</view>
              <view class="count">{{ info.today_settled_price }}</view>
            </view>
          </view>
        </view>
        <view class="work-platform">
          <view class="title">工作臺</view>
          <view class="manage-list">
            <view class="manage-item" @click="handleToCategory">
              <view class="icon">
                <text class="iconfont icon-fenleiguanli"></text>
                <!--              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />-->
              </view>
              <view class="msg">
                <view>商品分類管理</view>
                <view class="tip">設置門店商品分類</view>
              </view>
              <view class="right-icon">
                <text class="iconfont icon-arrow-right-copy"></text>
              </view>
            </view>
            <view class="manage-item" @click="handleToRouter('/pages/manages/goods/index')">
              <view class="icon">
                <text class="iconfont icon-shangpinguanli"></text>
                <!--              <image src="/static/image/img-6.png" style="width: 100%; height: 100%" mode="aspectFill" />-->
              </view>
              <view class="msg">
                <view>商品管理</view>
                <view class="tip">當前已上架商品{{ info.goods_num }}件</view>
              </view>
              <view class="right-icon">
                <text class="iconfont icon-arrow-right-copy"></text>
              </view>
            </view>
            <view class="manage-item" @click="handleToRouter('/pages/manages/promotions/index')">
              <view class="icon">
                <text class="iconfont icon-a-ziyuan595"></text>
                <!--              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />-->
              </view>
              <view class="msg">
                <view>優惠活動管理</view>
                <view class="tip">設置多充商品組合優惠活動</view>
              </view>
              <view class="right-icon">
                <text class="iconfont icon-arrow-right-copy"></text>
              </view>
            </view>
            <view class="manage-item" @click="handleToRouter('/pages/manages/exchange/index')">
              <view class="icon">
                <text class="iconfont icon-shouye1"></text>
                <!--              <image src="https://img.yzcdn.cn/vant/apple-3.jpg" style="width: 100%; height: 100%" mode="aspectFill" />-->
              </view>
              <view class="msg">
                <view>換購活動管理</view>
                <view class="tip">設置商品換購活動</view>
              </view>
              <view class="right-icon">
                <text class="iconfont icon-arrow-right-copy"></text>
              </view>
            </view>
            <view class="manage-item" @click="handleToRouter('/pages/manages/comments/index')">
              <view class="icon">
                <text class="iconfont icon-dingdanguanli"></text>
                <!--              <image src="/static/image/img-6.png" style="width: 100%; height: 100%" mode="aspectFill" />-->
              </view>
              <view class="msg">
                <view>評論管理</view>
                <view class="tip">查看門店所有用戶評論</view>
              </view>
              <view class="right-icon">
                <text class="iconfont icon-arrow-right-copy"></text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <uv-popup ref="popup" mode="center" :closeable="true" @change="handleChangeModal" bg-color="white" round="20rpx">
        <view class="stock-container">
          <view class="stock-content">
            <view class="stock-title">
              <view>庫存提醒</view>
              <view class="close-icon" @click="close">
                <text class="iconfont icon-icon-close"></text>
              </view>
            </view>
            <view class="stock-list">
              <view class="stock-item" v-for="activity in showActiveList" :key="activity.id">
                <view class="stock-item-title">
                  <view class="activity-name">{{ activity.name }}</view>
                </view>
                <view class="activity-list">
                  <view class="activity-item" v-for="(goods, index) in activity.children" :key="index">
                    <view class="goods-item">
                      <view class="goods_name">{{ goods.goods_name }}</view>
                      <view class="tip">库存不足</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

        </view>
      </uv-popup>
    </view>
  </PageWrapper>
</template>

<script setup>
import {onShow} from '@dcloudio/uni-app'
import {shopStatictis} from "../../api/shop";
import {ref, watch, computed} from "vue";
import {useUserStore} from "../../model/user";
import {scanCodeByOrder, Toast, toPromise} from "@/utils";
// import {scanOrder} from "@/api/order";
import {useShowModalTime} from "@/hooks";
import PageWrapper from "@/components/PageWrapper.vue";

const popup = ref(null)

const {open, visible, close} = useShowModalTime()

watch(() => visible.value, (newVal) => {
  if (newVal) {
    popup.value?.open()
  } else {
    popup.value?.close()
  }
}, {
  immediate: true,
})
const handleChangeModal = (e) => {
  if (e.show === false) {
    close()
  }
}

const handleMore = () => {
  // Toast.info('开发中，敬请期待')
  // return
  uni.navigateTo({
    url: '/pages/index/statistics'
  })
}

// header掃碼
const handleRight = () => {
  scanCodeByOrder().then(({order_no}) => {
    Toast.success('扫码成功')
    setTimeout(() => {
      uni.navigateTo({
        url: `/pages/orders/order-info?order_no=${order_no}`
      })
    }, 2000)
  })
}

const userStore = useUserStore()

const info = ref({
  sales_price: '',
  order_num: '',
  sales_num: '',
  shop_uv: ''
})

const activeList = ref([])

const showActiveList = computed(() => {
  const obj = activeList.value.reduce((acc, cur) => {
    if (acc[cur.discount_activity_id]) {
      acc[cur.discount_activity_id] = {
        name: cur.activity_name,
        id: cur.discount_activity_id,
        children: (acc[cur.discount_activity_id]?.children || []).concat(cur)
      }
    } else {
      acc[cur.discount_activity_id] = {
        name: cur.activity_name,
        id: cur.discount_activity_id,
        children: [cur]
      }
    }
    return acc
  }, {}) || {}
  return Object.values(obj || {})
})


const getInfo = () => {
  shopStatictis().then(res => {
    activeList.value = res.data?.sold_out || []
    if (activeList.value.length)
      open(userStore.userInfo.mobile, true)
    info.value = res.data || {};
  })
}

onShow(() => {
  if (userStore.isLogin())
    getInfo()
})


// 分類管理
const handleToCategory = () => {
  uni.navigateTo({
    url: '/pages/manages/goods-category/index'
  })
}

const handleToRouter = (path) => {
  uni.navigateTo({
    url: path
  })
}
</script>
<style>
page {
  height: 100%;
}
</style>
<style lang="scss">
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stock-container {
  max-height: 80vh;
  width: 90vw;

  .stock-content {
    height: 100%;
    overflow-y: auto;
    position: relative;

    .stock-title {
      position: sticky;
      text-align: center;
      top: 0;
      left: 0;
      padding: 20rpx 0;
      background-color: #fff;
      z-index: 10;

      .close-icon {
        color: #999;
        z-index: 10;
        font-size: 24rpx;
        position: absolute;
        right: 20rpx;
        top: 20rpx;
      }
    }
  }

  .stock-list {
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;
    padding: 20rpx;

    .stock-item-title {
      margin-bottom: 10rpx;
      //border-left: 8rpx solid #f56c6c;
      border-radius: 6rpx;
      //color: #333;
      font-size: 28rpx;
      padding: 10rpx;
      position: relative;

      .activity-name {
        position: relative;
        z-index: 5;
      }

      color: #fff;

      &:before {
        content: '';
        position: absolute;
        z-index: 0;
        border-radius: 6rpx;
        left: 0;
        top: 0;
        height: 100%;
        width: 60%;
        background: linear-gradient(to right, rgba(245, 108, 108, 1), rgba(245, 108, 108, 0));
      }
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      row-gap: 10rpx;

      .activity-item {
        display: flex;
        align-items: center;
        padding: 10rpx;
        background-color: #f5f5f5;
        border-radius: 6rpx;

        .goods-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #666;
          font-size: 26rpx;

          .goods_name {
            font-weight: bold;
            white-space: nowrap;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .tip {
            color: #f56c6c;
            font-size: 24rpx;
            flex: none;
          }
        }
      }
    }
  }
}

.title-statictis {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 10rpx;

  .title-name {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
  }

  .title-operation {
    font-size: 26rpx;
    color: #007aff;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  flex-wrap: wrap;
  row-gap: 20rpx;
  padding: 30rpx 0;

  .grid-item {
    //width: 50%;
    text-align: center;
    //padding: 30rpx 0;
    color: #333;
  }

  .tip {
    font-size: 28rpx;
  }

  .count {
    font-size: 36rpx;
    line-height: 62rpx;
  }
}

.right {
  color: #fff;

  .iconfont {
    font-size: 46rpx;
  }
}

.header-bg {
  height: 200rpx;
  background-color: #000;
  flex: none;
}

.main {
  flex: 1;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;

  .top-statictis {
    flex: none;
    width: 95%;
    border-radius: 10rpx;
    background-color: #fff;
    box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
    margin: -180rpx auto 0;
    //padding-left: 30rpx;
    //padding-right: 30rpx;
  }

  .grid {
    flex: none;
  }
}

.work-platform {
  padding: 20rpx;
  flex: 1;
  display: flex;
  flex-direction: column;

  .title {
    flex: none;
  }

  .manage-list {
    flex: 1;
    overflow-y: auto;
    padding-top: 20rpx;
    padding-bottom: 20rpx;

    .manage-item {
      margin-bottom: 20rpx;
      padding: 20rpx;
      background-color: #fff;
      display: flex;
      column-gap: 20rpx;
      border-radius: 15rpx;
      align-items: center;

      .icon {
        width: 100rpx;
        height: 100rpx;
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;

        .iconfont {
          font-size: 60rpx;
        }
      }

      .msg {
        flex: 1;
        line-height: 50rpx;

        .tip {
          font-size: 28rpx;
          color: #999;
        }
      }

      .right-icon {
        flex: none;
        font-size: 40rpx;
        color: #666;
      }
    }
  }
}
</style>
