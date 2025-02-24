<script setup>
import {ref, computed} from 'vue'
import {uniqueId} from 'lodash'

const popRef = ref()

const tags = ref([
  {name: '當季限定', key: 1, sort: 1}
])

const addFormData = ref({
  name: '',
  sort: '',
  key: ''
})

const maxSort = computed(() => {
  return tags.value.length ? Math.max(...tags.value.map(item => item.sort)) : 0
})

const handleRemoveTag = (key) => {
  uni.showModal({
    title: '提示',
    content: '是否刪除該分類？',
    success: function (res) {
      if (res.confirm) {
        tags.value = tags.value.filter(item => item.key !== key)
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
    name: val.name,
    sort: val.sort,
    key: val.key
  }
  popRef.value?.open()
}

const clearAddFormData = () => {
  addFormData.value = {
    name: '',
    sort: '',
    key: ''
  }
}

const submitAddTag = () => {
  if(!addFormData.value.name) return uni.showToast({title: '請輸入分類名稱', icon: 'none'})
  if (addFormData.value.key) {
    tags.value = tags.value.map(item => {
      if (item.key === addFormData.value.key) {
        return addFormData.value
      }
      return item
    })
  } else {
    tags.value.push({
      ...addFormData.value,
      key: uniqueId()
    })
  }
  popRef.value?.close()

}

const sortTags = computed(() => {
  return tags.value.sort((a, b) => +b.sort - +a.sort)
})
</script>

<template>
  <view class="container">
    <view class="category-list">
      <view class="category-item flex-center" v-for="item in sortTags" :key="item.key" @click="handleEditTag(item)">
        <view>{{ item.name }}</view>
        <view class="remove-icon flex-center" @click.stop="handleRemoveTag(item.key)">
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
            <uv-input placeholder="輸入分類名稱" v-model="addFormData.name"/>
          </view>
          <view class="form-item">
            <uv-input :placeholder="`輸入排序（數字越大排序越靠前 当前最大 ${maxSort}）`" type="number"
                      v-model="addFormData.sort"/>
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
