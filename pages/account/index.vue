<script setup>
import {useUserStore} from "../../model/user";
import {computed} from "vue";
import {onShow} from '@dcloudio/uni-app'
import {useNotAuthModal} from "../../hooks";

const {open} = useNotAuthModal()

const userStore = useUserStore()
const handleToRoute = (path) => {
  if (!userStore.isLogin()) {
    return open()
  }
  uni.navigateTo({
    url: path
  })
}

const userInfo = computed(() => userStore.userInfo)

onShow(() => {
  if (!userStore.isLogin()) {
    open()
  }
})

</script>

<template>
  <view class="container">
    <view class="header">
      <view class="avatar">
        <uv-avatar :size="60" shape="square" :src="userInfo.shop_avatar"/>
      </view>
      <view class="content">
        <view class="user-name">{{ userInfo.shop_name }}</view>
        <view class="sub-title" v-if="!userInfo.shop_no">電話：{{ userInfo.prefix }}{{ userInfo.mobile }}</view>
        <view v-else class="sub-title">ID: {{ userInfo.shop_no }}</view>
      </view>
    </view>
    <view class="action-content">
      <view class="action-item" @click="handleToRoute('/pages/account/account-info')">
        <view class="action-item-icon">
          <text class="iconfont icon-shangjiaziliao"></text>
          <!--        <uv-avatar text="資料" :size="40" />-->
        </view>
        <view class="item-content">
          <view class="item-title">商家資料</view>
          <view class="item-sub-title">管理商家門店信息</view>
        </view>
      </view>

      <view class="action-item">
        <view class="action-item-icon">
          <text class="iconfont icon-yonghushouce"></text>
          <!--        <uv-avatar text="資料" :size="40" />-->
        </view>
        <view class="item-content">
          <view class="item-title">新手教程</view>
          <view class="item-sub-title">查看APP使用教程</view>
        </view>
      </view>

      <view class="action-item" @click="handleToRoute('/pages/account/helper')">
        <view class="action-item-icon">
          <text class="iconfont icon-xinshoujiaocheng"></text>
          <!--        <uv-avatar text="資料" :size="40" />-->
        </view>
        <view class="item-content">
          <view class="item-title">幫助中心</view>
          <view class="item-sub-title">相關問題解答</view>
        </view>
      </view>

      <view class="action-item" @click="handleToRoute('/pages/settings/index')">
        <view class="action-item-icon">
          <text class="iconfont icon-shezhi"></text>
          <!--        <uv-avatar text="資料" :size="40" />-->
        </view>
        <view class="item-content">
          <view class="item-title">設置</view>
          <view class="item-sub-title">關於APP設置</view>
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
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.action-item {
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  column-gap: 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;

  .item-title {
    font-size: 30rpx;
    font-weight: bold;
  }

  .item-sub-title {
    color: #999;
    font-size: 24rpx;
    line-height: 56rpx;
  }
}

.action-content {
  flex: 1;
  padding: 20rpx;
}

.header {
  flex: none;
  padding: 40rpx 30rpx;
  display: flex;
  align-items: center;
  background-color: black;
  column-gap: 20rpx;
}

.content {
  line-height: 50rpx;
  color: #fff;

  .user-name {
    font-size: 30rpx;
    font-weight: bold;
  }

  .sub-title {
    font-size: 26rpx;
    color: #fff;
    line-height: 60rpx;
  }
}

.action-item-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;

  .iconfont {
    font-size: 60rpx;
    color: #333;
  }

}
</style>
