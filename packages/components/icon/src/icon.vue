<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@zhangli-hua/utils/create'
import { iconProps } from './icon'

defineOptions({
  name: 'z-icon'
})
const bem = createNamespace('icon')

// 使用set up模式 需要通过 defineProps 方法对属性定义
const props = defineProps(iconProps) 
// 计算属性 来计算一个样式来处理
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>
