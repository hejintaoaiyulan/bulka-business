<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {ref} from 'vue'
import {replyComment} from "../../../api/commentary";
import {Toast} from "../../../utils";

const formData = ref({
  id: '',
  response: ''
})

const userName = ref('')

onLoad((query) => {
  if (query?.id) {
    formData.value.id = query.id
    userName.value = query.user_name
  }
})


const handleSubmit = () => {
  replyComment(formData.value).then(res => {
    Toast.success('已回复')
    setTimeout(() => {
      uni.navigateBack({})
    }, 1000)
  })
}
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="reply-content">
        <view class="title">正在回復“
          <text>{{formData.user_name}}</text>
          ”的評價
        </view>
        <view class="msg">
          <uv-textarea placeholder="請輸入" v-model="formData.response"></uv-textarea>
        </view>
      </view>

      <view class="submit-button flex-right">
        <uv-button type="success" @click="handleSubmit">確認回復</uv-button>
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
  padding: 30rpx;
}

.content {
  padding: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
}

.reply-content {

  padding: 30rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20rpx;

  .msg {
    width: 100%;
  }

  .title {
    color: #666;

    text {
      color: #000;
      font-size: 38rpx;
    }
  }
}

.submit-button {
  padding: 30rpx 50rpx;
  width: 100%;
}

</style>
