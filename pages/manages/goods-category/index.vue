<script setup>
import {ref, computed} from 'vue'
import {uniqueId} from 'lodash'
import {delGoodsType, getGoodsTypes, saveGoodsType} from "../../../api/goods";
import {onShow} from '@dcloudio/uni-app'
import {Toast} from "../../../utils";

const popRef = ref()

const tags = ref([])

const getData = () => {
  getGoodsTypes().then(res => {
    tags.value = res.data || []
  })
}

const addFormData = ref({
  goods_type_name: '',
  weigh: '',
  id: ''
})

const maxSort = computed(() => {
  return tags.value.length ? Math.max(...tags.value.map(item => item.weigh)) : 0
})

const handleRemoveTag = (id) => {
  uni.showModal({
    title: '提示',
    content: '是否刪除該分類？',
    success: function (res) {
      if (res.confirm) {
        delGoodsType({id: id}).then(() => {
          tags.value = tags.value.filter(item => item.id !== id)
        })
      }
    }
  })
}
// 添加分類標籤
const handleAddTag = () => {
  popRef.value?.open()
  clearAddFormData()
}

const handleEditTag = (val) => {
  addFormData.value = {
    goods_type_name: val.goods_type_name,
    weigh: val.weigh,
    id: val.id
  }
  popRef.value?.open()
}

const clearAddFormData = () => {
  addFormData.value = {
    goods_type_name: '',
    weigh: '',
    id: ''
  }
}

const submitAddTag = () => {
  if(!addFormData.value.goods_type_name) return Toast.info('請輸入分類名稱')
  saveGoodsType(addFormData.value).then(response => {
    if (addFormData.value.id) {
      tags.value = tags.value.map(item => {
        if (item.id === addFormData.value.id) {
          return response.data
        }
        return item
      })
    } else {
      tags.value.push(response.data)
    }
  })

  popRef.value?.close()

}

const sortTags = computed(() => {
  return tags.value.sort((a, b) => +b.weigh - +a.weigh)
})


onShow(() => {
  getData()
})
</script>

<template>
  <view class="container">
    <view class="category-list">
      <view class="category-item flex-center" v-for="item in sortTags" :key="item.key" @click="handleEditTag(item)">
        <view>{{ item.goods_type_name }}</view>
        <view class="remove-icon flex-center" @click.stop="handleRemoveTag(item.id)">
          <text class="iconfont icon-jianhao"></text>
        </view>
      </view>
      <view class="category-item flex-center" @click="handleAddTag">
        <text class="iconfont icon-jiajianzujianjiahao"></text>
      </view>
    </view>
    <uv-popup custom-style="height: 480rpx" ref="popRef" mode="bottom">
      <view class="content safe-pb">
        <view class="title">添加分類</view>
        <view class="form">
          <view class="form-item">
            <uv-input placeholder="輸入分類名稱" v-model="addFormData.goods_type_name"/>
          </view>
          <view class="form-item">
            <uv-input :placeholder="`輸入排序（數字越大排序越靠前 当前最大 ${maxSort}）`" type="number"
                      v-model="addFormData.weigh"/>
          </view>
          <view class="form-item">
            <uv-button type="primary" class="button" @click="submitAddTag">確定新增/保存</uv-button>
          </view>
        </view>
      </view>
    </uv-popup>
  </view>
</template>

<style scoped lang="scss">
.title {
  font-size: 32rpx;
  text-align: center;
  padding: 20rpx;
  color: #333;
}

.form {
  padding: 30rpx;

  .form-item {
    margin-bottom: 20rpx;
  }
}

.container {
  padding: 30rpx;
}

.category-list {
  display: flex;
  column-gap: 30rpx;
  row-gap: 40rpx;
  flex-wrap: wrap;

  .category-item {
    width: 30%;
    text-align: center;
    background-color: #0c102c;
    color: #fff;
    font-size: 32rpx;
    position: relative;
    border-radius: 8rpx;
    height: 80rpx;
  }

  .remove-icon {
    position: absolute;
    right: -20rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    display: flex;
    background-color: #df6867;
    top: -20rpx;
  }
}
</style>
