<script setup>
import {computed} from "vue";

const props = defineProps(['options', 'keyName', 'disabled'])
const emits = defineEmits(['change'])

// 选择数据
const handleChange = (e) => {
  const index = e.detail.value
  const value = props.options[index]
  emits('change', value)
}

const range = computed(() => {
  return props.options?.map((item) => item[props.keyName])
})


</script>

<template>
<picker mode="selector" :range="range" @change="handleChange" :disabled="props.disabled">
  <slot></slot>
</picker>
</template>

<style scoped lang="scss">

</style>
