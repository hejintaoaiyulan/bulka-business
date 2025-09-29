<script setup>
import { onLoad } from '@dcloudio/uni-app'
import {ref, shallowRef} from "vue";
import {getProtocol} from "@/api/public";

const pageQuery = shallowRef({})
const content = ref({})

const getContent = () => {
  getProtocol(pageQuery.value).then((res) => {
    content.value = (res.data || {}).content || {}
  })
}

onLoad(query => {
  pageQuery.value = query
  getContent()
})
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="title" style="font-size: 32rpx;font-weight: bold;">
        <text>{{ content.title }}</text>
      </view>
    </view>
    <view class="content" style="margin-top: 20rpx;font-size: 26rpx;">
      <rich-text :nodes="content.content"></rich-text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  background-color: #f8f8f8;
  height: 100%;
  padding: 20rpx;
}

.content {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 10rpx;
}

</style>
