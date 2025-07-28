<template>
  <view style="width: 100%;padding: 20rpx">
    <qiun-data-charts
        :ontouch="true"
        type="line"
        :opts="opts"
        :chartData="chartData"
        @click="handleClick"
        canvas2d
    />
  </view>
</template>

<script setup>
import {ref, watch } from 'vue'

const props = defineProps(['data'])

// 时间轴横坐标
const hours = []

const opts = ref({
  color: ["#73C0DE","#3CA272","#FC8452","#9A60B4"],
  padding: [15, 10, 0, 0],
  enableScroll: true,
  legend: { show: true },
  xAxis: {
    disableGrid: true,
    // scrollShow: true,
    fontSize: 11,
    itemCount: 4
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
    splitNumber: 4
  },
  extra: {
    line: {
      type: "curve",
      width: 2,
      activeType: "hollow"
    },
    tooltip: {
      showBox: true,
      showArrow: true,
      format: item => `${item.name}: ${item.data}`
    }
  }
})

const chartData = ref({
  categories: hours,
  series: [
    {name: '点击数', data: []},
    {name: '下单数', data: []}
  ]
})

// 点击图表点提示
const handleClick = (e, chartTitle) => {

}

// 生成随机数据
function randomData(length = 10, min = 80, max = 240) {
  return Array.from({length}, () => Math.floor(Math.random() * (max - min) + min))
}


watch(() => props.data, (newData) => {
  if (newData) {
    chartData.value = {
      categories: newData.xData || hours,
      series: (newData.data || [])
      //     .map(item => {
      //   item.data = randomData(newData.xData.length)
      //   return item
      // })

    }
  }
}, { immediate: true })

</script>