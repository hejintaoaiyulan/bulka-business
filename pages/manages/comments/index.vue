<script setup>
import {ref} from 'vue'
import {usePageLoading} from "../../../hooks";
import {countComment, getCommentList} from "../../../api/commentary";
import {onShow, onLoad, onReachBottom} from '@dcloudio/uni-app'

const {dataList, getData, loadNext, reload} = usePageLoading(getCommentList, {
  onFinish: uni.stopPullDownRefresh
})

const requestParams = ref({
  star_status: '',
  img_status: '',
  response_status: ''
})

onShow(() => {
  getCount()
  reload()
})

const tabs = ref([
  {
    name: '全部',
    key: 1,
    badge: {
      value: 0
    }
  },
  {
    name: '有圖',
    key: 2,
    badge: {
      value: 0
    }
  },
  {
    name: '好評',
    key: 3,
    badge: {
      value: 0
    }
  },
  {
    name: '中評',
    key: 4,
    badge: {
      value: 0
    }
  },
  {
    name: '差評',
    key: 5,
    badge: {
      value: 0
    }
  }
])

const search = () => {
  reload(requestParams.value)
}
onReachBottom(() => {
  console.log('刷新')
})

const getCount = () => {
  countComment().then(res => {
    console.log(res)
    const obj = {
      1: 'count',
      2: 'img_status',
      3: 'star_status_1',
      4: 'star_status_2',
      5: 'star_status_3'
    }
    tabs.value = tabs.value.map(item => {
      item.badge.value = res.data[obj[item.key]]
      return item
    })
  })
}

const handleReply = (val) => {
  uni.navigateTo({
    url: '/pages/manages/comments/reply-comment?id=' + val.id + '&user_name=' + val.user_name
  })
}

const handleStatus = ({key}) => {
  const config = {
    1: {star_status: '', img_status: '', response_status: ''},
    2: {star_status: '', img_status: 1, response_status: ''},
    3: {star_status: 1, img_status: '', response_status: ''},
    4: {star_status: 2, img_status: '', response_status: ''},
    5: {star_status: 3, img_status: '', response_status: ''},
  };

  if (Object.hasOwn(config, key)) {
    requestParams.value = config[key];
  }

  search();
};
</script>

<template>
  <view class="container">
    <view class="header">
      <uv-tabs :list="tabs" line-color="#c74336" :scrollable="false" @change="handleStatus"/>
    </view>
    <scroll-view :scroll-y="true" @scrolltolower="loadNext" style="flex: 1; overflow: hidden;">
      <view class="content">

        <view class="comment-list">
          <view class="empty" v-if="!dataList.length">
            暂无评论
          </view>
          <view class="comment-item" v-for="item in dataList" :key="item.id">
            <view class="comment-title">
              <view class="user">
                <uv-avatar :src="item.avatar" :size="30"/>
                <text>{{ item.user_name }}</text>
              </view>
              <view class="time">
                {{ item.createtime }}
              </view>
            </view>
            <view class="comment-star">
              <uv-rate :count="5" :value="item.star"></uv-rate>
            </view>
            <view class="comment-content">
              {{ item.content }}
            </view>
            <view class="comment-pictures">
              <view class="picture-item" v-for="(img, index) in item.images" :key="index">
                <uv-image :src="img" mode="aspectFit" width="100%" height="100%"/>
              </view>
            </view>
            <view class="comment-goods">{{ Array.isArray(item.goods_name) ? item.goods_name.join('、') : item.goods_name }}</view>
            <view class="response-text" v-if="item.response_status === 1">
              回复：{{ item.response }}
            </view>
            <view class="comment-operation flex-right" v-if="item.response_status === 2">
              <uv-button size="normal" @click="handleReply(item)">回復評論</uv-button>
            </view>
          </view>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.comment-star {
  pointer-events: none;
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.header {
  flex: none;
  white-space: nowrap;
  padding-bottom: 10rpx;
}

.content {
  flex: 1;
  //overflow-y: auto;
  padding: 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.comment-list {
  display: flex;
  flex-direction: column;
  row-gap: 15rpx;

  .comment-item {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    row-gap: 20rpx;
  }

  .comment-title {
    display: flex;

    .user {
      display: flex;
      align-items: center;
      column-gap: 10rpx;
      font-size: 26rpx;
    }

    justify-content: space-between;
    align-items: center;

    .time {
      font-size: 24rpx;
      color: #999;
    }
  }

  .comment-pictures {
    display: flex;
    column-gap: 20rpx;
    align-items: center;

    .picture-item {
      width: 180rpx;
      height: 180rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .comment-goods {
    font-size: 24rpx;
    color: #999;
  }
}

.response-text {
  padding: 20rpx;
  color: #666;
  font-size: 26rpx;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 10rpx;
}

.empty {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 28rpx;
}
</style>
