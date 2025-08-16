<!-- components/PageWrapper.vue -->
<template>
  <view class="page-wrapper" @pointerdown="handleHidden">
    <slot />
    <view class="feedback-btn" :class="{hidden: hidden}" @click="handleFeedback" @pointerdown.capture="(evt)=> evt.stopPropagation()">
      <image src="/static/feedback-icon.png" mode="aspectFill" />
    </view>
  </view>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {onShow} from "@dcloudio/uni-app";

let timer = null
const hidden = ref(true)
const handleFeedback = (evt) => {
  hidden.value = false
  uni.navigateTo({
    url: '/pages/feedback/index'
  })
}

const setHidden = () => {
  hidden.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    hidden.value = false
  }, 3000)
}

const handleHidden = () => {
  setHidden()
}

onShow(() => {
  setHidden()
})
</script>

<style scoped lang="scss">
.feedback-btn.hidden {
  right: -90rpx;
  opacity: 0.4;
}
.page-wrapper {
  position: relative;
  height: 100%;
}

/* 懸浮按鈕樣式 */
.feedback-btn {
  position: fixed;
  transition: all 0.25s ease-in-out;
  bottom: 80rpx;
  right: 20rpx;
  width: 126rpx;
  height: 121rpx;
  z-index: 999;
  //border-radius: 50%;
  //box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2);
  //background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  image {
    width: 126rpx;
    height: 121rpx;
  }
}
</style>
