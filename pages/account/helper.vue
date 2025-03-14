<script setup>
import {ref} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import {getQuestionAnswer} from "../../api/public";
import UvCollapse from "../../uni_modules/uv-collapse/components/uv-collapse/uv-collapse.vue";
const list = ref([])

const getData = () => {
  getQuestionAnswer().then(res => {
    list.value = res.data || []
  })
}

onShow(() => {
  getData()
})
</script>

<template>
<view class="container">
  <uv-collapse>
    <uv-collapse-item :title="item.title" name="about-order" v-for="(item, index) in list" :key="index">
      <text class="uv-collapse-content">{{item.content}}</text>
    </uv-collapse-item>
  </uv-collapse>
</view>
</template>

<style scoped lang="scss">

</style>
