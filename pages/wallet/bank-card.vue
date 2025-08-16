<script setup>
import {ref} from 'vue';
import {onShow} from '@dcloudio/uni-app';
import {getBankCardList, unbindBankCard} from "@/api/wallet";
import {maskBankCard, showModal, Toast} from "@/utils";

const backCardList = ref([]);

const handleAdd = () => {
  uni.navigateTo({
    url: '/pages/wallet/add-bank'
  })
}

const getList = () => {
  getBankCardList().then(res => {
    backCardList.value = res.data || []
  })
}

onShow(() => {
  getList()
})

const handleUnbind = (card) => {
  showModal('是否確認解綁該銀行卡？', '提示').then(() => {
    unbindBankCard({id: card.id}).then(() => {
      Toast.success('解綁成功')
      getList(); // 重新獲取銀行卡列表
    }).catch(err => {
      Toast.fail(err.message || '解綁失敗')
    });
  })
}

</script>

<template>
<view class="container safe-pb">
  <uv-navbar title="銀行卡管理" bg-color="#fff" placeholder autoBack safe-area-inset-top>
    <template #right>
      <view class="right-text" @click="handleAdd">添加</view>
    </template>
  </uv-navbar>
  <view class="content">
    <view class="withdrawal-cards">
      <view class="card-item" v-for="card in backCardList" :key="card.id">
        <view class="card-icon">
          <image src="/static/bank-card.png" style="width: 100rpx; height: 100rpx;" mode="widthFix"/>
        </view>
        <view class="card-info">
          <view class="bank-name">{{card.bank_name}}</view>
          <view class="bank-number">{{maskBankCard(card.bank_account)}}</view>
        </view>
        <view class="select-icon">
          <view @click="handleUnbind(card)">解綁</view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<style scoped lang="scss">
.right-text {
  font-size: 22rpx;
}

.content {
  padding: 20rpx;
}

.withdrawal-cards {
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  width: 100%;

  > view {
    flex: none;
  }

  .card-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    width: 100%;
    padding: 10rpx 20rpx;
    column-gap: 20rpx;

    .card-info {
      flex: 1;
    }
  }
}

.select-icon {
  font-size: 22rpx;
  color: #666;
}
</style>