<script setup>
import UvImage from "@/uni_modules/uv-image/components/uv-image/uv-image.vue";
import {computed, ref, watch} from "vue";

const props = defineProps(['titleStyle', 'avatarSize', 'customStyle', 'avatarRadius', 'goods', 'showType','showDisabled'])
const emits = defineEmits(["removeGoods"]);

const defaultAvatarSize = computed(() => {
  return props.avatarSize || '125rpx'
})

const defaultAvatarRadius = computed(() => {
  return props.avatarRadius || '15rpx'
})

const goodsData = ref()

watch(() => props.goods, (val) => {
  goodsData.value = val || {
    goods_image: '/static/pass-fail.png',
    goods_name: '测试商品名称',
    sale_price: 99.8,
    original_price: 199
  }
}, {immediate: true})

const typeName = computed(() => {
  const valueObj = {
    1: '',
    2: '換購',
    3: '活動',
    4: '贈品'
  }
  return valueObj[goodsData.value.type || goodsData.value.goods_active_type] || ''
})

const isFreebies = computed(() => {
  return goodsData.value.type === 4 || goodsData.value.goods_active_type === 4
})

// 商品数量
const goodsCount = computed(() => {
  return goodsData.value.count || goodsData.value.num || goodsData.value.goods_num || 1
})

// 是否没有了库存
const isOutOfStock = computed(() => {
  if (isFreebies.value) return false
  return goodsData.value.stock === 0 || goodsData.value.goods_stock === 0
})
// 是否购买数量大于了库存
const isOverStock = computed(() => {
  if (isFreebies.value) return false
  return goodsData.value.goods_stock && goodsData.value.goods_stock < goodsCount.value
})
// 商品是否下架
const isOffShelf = computed(() => {
  return goodsData.value.status === 2
})
// 是否无效商品
const isInvalid = computed(() => {
  return goodsData.value.status === 0
})
// 根据商品状态判断显示文案
const goodsStatusText = computed(() => {
  if (!props.showDisabled) return ''
  if (isFreebies.value) return ''
  if (isOutOfStock.value) return '已售罄'
  if (isOverStock.value) return '超出库存'
  if (isOffShelf.value) return '已下架'
  if (isInvalid.value) return '无效商品'
  return ''
})

// 根据状态判断此商品是不是需要禁用
const isDisabled = computed(() => {
  if(!props.showDisabled) return false
  return isOutOfStock.value || isOverStock.value || isOffShelf.value || isInvalid.value
})

// 移除商品
const handleRemove = () => {
  // console.log(isDisabled.value)
  if (isDisabled.value) {
    emits('removeGoods', goodsData.value)
  }
}

</script>

<template>
  <view class="goods-container">
    <view class="goods-content" :style="props.customStyle" :class="{ disabled: isDisabled }">
      <view class="avatar">
        <uv-image :src="goodsData.goods_image" mode="aspectFill" :width="defaultAvatarSize" :height="defaultAvatarSize"
                  :radius="defaultAvatarRadius"/>
      </view>
      <view class="message">
        <view class="top-content">
          <view class="title" :style="props.titleStyle">
            <text class="goods-type-name" :class="{freebies: isFreebies}" v-if="typeName && props.showType">{{
                typeName
              }}
            </text>
            {{ goodsData.goods_name }}
          </view>
          <view class="tag">
            <slot name="tag"></slot>
          </view>
        </view>
        <view class="price" v-if="!$slots.footer">
          <text class="unit">HK$</text>
          <text class="price-number DINPro">{{ goodsData.sale_price }}</text>
          <text class="old-price">HK$
            <text class="DINPro">{{ goodsData.original_price }}</text>
          </text>
        </view>
        <slot name="footer"></slot>
      </view>
      <view class="extra-option" v-if="isDisabled">
        <view @click="handleRemove">
          <text class="iconfont icon-shanchu"></text>
          <view>{{goodsStatusText}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

.goods-type-name {
  color: #fff;
  font-size: 18rpx;
  padding: 3rpx 16rpx;
  border-radius: 4rpx;
  background-color: #6449CC;
  margin-right: 8rpx;

  &.freebies {
    background-color: #d42f2f;
  }
}

.goods-content {
  position: relative;
  .extra-option {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 0;
    padding: 30rpx;
    height: 100%;
    background: #fff;
    border-top-left-radius: 25rpx;
    border-bottom-left-radius: 25rpx;
    font-size: 22rpx;
    line-height: 40rpx;
    color: #f56c6c;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  &.disabled {
    .avatar,.message {
      opacity: 0.5;
    }
    //background-color: #f8f8f8;
    //border-radius: 20rpx;
  }
  display: flex;
  align-items: center;
  //padding: 20rpx;
  //background-color: #fff;
  column-gap: 10rpx;

  .title {
    line-height: 30rpx;
    font-size: 24rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    // 隐藏两行
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .message {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .price {
    color: #FA7028;

    .unit {
      font-size: 18rpx;
    }

    .price-number {
      font-size: 28rpx;
      font-weight: bold;
    }

    .old-price {
      font-size: 20rpx;
      text-decoration: line-through;
      color: #C9C9CA;
      margin-left: 5rpx;
    }
  }
}
</style>