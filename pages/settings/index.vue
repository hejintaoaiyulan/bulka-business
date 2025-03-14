<script setup>
import {useUserStore} from "../../model/user";

const userStore = useUserStore()
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '確定要退出登錄嗎？',
    success: function (res) {
      if (res.confirm) {
        userStore.logOut()
      }
    }
  })
}

</script>

<template>
<view class="container">
  <uv-cell-group>
    <uv-cell title="賬戶安全中心" arrow-direction="right" :isLink="true" title-style="line-height: 90rpx" url="/pages/settings/account-safe"></uv-cell>
    <uv-cell title="關於我們" arrow-direction="right" :isLink="true" title-style="line-height: 90rpx"></uv-cell>
    <uv-cell title="常見問題" arrow-direction="right" :isLink="true" url="/pages/account/helper" title-style="line-height: 90rpx"></uv-cell>
    <uv-cell title="清除緩存" value="200M" title-style="line-height: 90rpx"></uv-cell>
    <uv-cell title="版本信息" arrow-direction="right" :isLink="true" title-style="line-height: 90rpx"></uv-cell>
    <uv-cell title="反饋建議" arrow-direction="right" :isLink="true" title-style="line-height: 90rpx"></uv-cell>
  </uv-cell-group>
  <view class="logout-button" @click="handleLogout">
    <uv-button custom-style="background: black; color: #fff" size="large">安全退出登錄</uv-button>
  </view>
</view>
</template>

<style scoped lang="scss">
.logout-button {
  margin-top: 110rpx;
  padding: 0 30rpx;
}
</style>
