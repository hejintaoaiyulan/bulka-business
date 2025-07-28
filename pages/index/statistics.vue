<script setup>
import GoodsItem from "@/components/GoodsItem.vue";
import LineChart1 from "@/pages/index/modules/LineChart1.vue";
import {ref, computed} from "vue";
import {onShow, onPullDownRefresh} from '@dcloudio/uni-app'
import {getShopToDayStatistics} from "@/api/shop";
import {Toast} from "@/utils";

const info = ref({})


// 第一个数据
const chartData1 = computed(() => {
  return {
    xData: info.value.column2,
    data: [
      {
        name: '点击量',
        data: info.value.goodsPv || []
      },
      {
        name: '下单量',
        data: info.value.orderNum || []
      }
    ]
  }
})

const chartData2 = computed(() => {
  return {
    xData: info.value.column2,
    data: [
      {
        name: '连招1次点击量',
        data: info.value.activity1 || []
      },
      {
        name: '连招2次点击量',
        data: info.value.activity2 || []
      },
      {
        name: '连招3次点击量',
        data: info.value.activity3 || []
      },
      {
        name: '连招4次点击量',
        data: info.value.activity4 || []
      }
    ]
  }
})

const chartData3 = computed(() => {
  return {
    xData: info.value.column2,
    data: [
      {
        name: '连招1次下单量',
        data: info.value.activityOrder1 || []
      },
      {
        name: '连招2次下单量',
        data: info.value.activityOrder2 || []
      },
      {
        name: '连招3次下单量',
        data: info.value.activityOrder3 || []
      },
      {
        name: '连招4次下单量',
        data: info.value.activityOrder4 || []
      }
    ]
  }
})

// 获取数据详情
const getInfo = () => {
  getShopToDayStatistics().then(res => {
    info.value = res.data || {}
  }).catch(err => {
    Toast.info(err.message || '获取数据失败')
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
}
onShow(() => {
  getInfo()
})

onPullDownRefresh(() => {
  getInfo()
})
</script>

<template>
  <view class="container">
    <view class="content safe-pb">
      <view class="card">
        <view class="card-title">
          試食商品數據
        </view>
        <view class="card-content">
          <view class="goods-list">
            <uv-empty />
            <view>
<!--              <GoodsItem avatar-size="110rpx">-->
<!--                <template v-slot:tag>-->
<!--                  <view class="tag">精选新鲜食材，尽享无限风味</view>-->
<!--                </template>-->
<!--                <template v-slot:footer>-->
<!--                  <view class="footer">-->
<!--                    <view class="price">HK$ 12.00</view>-->
<!--                    <view class="numbers">-->
<!--                      <text>点击量 999</text>-->
<!--                      <text>|</text>-->
<!--                      <text>下单量 999</text>-->
<!--                    </view>-->
<!--                  </view>-->
<!--                </template>-->
<!--              </GoodsItem>-->
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">
          商品數據
        </view>
        <view class="card-sub-title">
          统计用户每日商品点击数以及下单数
        </view>
        <view class="card-content">
          <LineChart1 :data="chartData1"/>
        </view>
      </view>

      <view class="card">
        <view class="card-title">
          连招数据
        </view>
        <view class="card-sub-title">
          统计用户每日点击连招次数汇总
        </view>
        <view class="card-content">
          <LineChart1 :data="chartData2"/>
        </view>
        <view class="card-sub-title">
          统计用户每日点击连招下单汇总
        </view>
        <view class="card-content">
          <LineChart1 :data="chartData3"/>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
  background-color: #f8f8f8;
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  padding: 20rpx;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;

  .price {
    color: #e64340;
  }

  .numbers {
    color: #999;
    display: flex;
    align-items: center;
    column-gap: 20rpx;
  }
}

.tag {
  color: #999;
  font-size: 24rpx;
  margin: 15rpx 0;
}

.goods-list {
  > view {
    padding: 20rpx 0;

    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
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
  }

  .card-sub-title {
    color: #999;
    font-size: 24rpx;
    line-height: 40rpx;
    margin-bottom: 20rpx;
  }
}
</style>