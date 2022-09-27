<template>
  <transition
    name="z-message-fade"
    @before-leave="onClose"
    @after-leave="emit('destroy')"
  >
    <div
      v-show="visibleRef"
      :style="styles"
      :class="[bem.b(), bem.m(type), bem.is('center', center)]"
    >
      message
    </div>
  </transition>
</template>
<script setup lang="ts">
import { messageProps, messageEmits } from './type'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { createNamespace } from '@zhangli-hua/utils/create'
const bem = createNamespace('message')
const emit = defineEmits(messageEmits)
const props = defineProps(messageProps)
const visibleRef = ref(false)
const styles = computed(() => {
  return {
    top: `${props.offset}px`
  }
})
let timer: any = null
const startTimer = () => {
  timer = setTimeout(() => {
    visibleRef.value = false
  }, props.duration)
}
// 組件加載完畢之後談出
onMounted(() => {
  // 多久之後影藏message彈窗 - duration
  startTimer()
  visibleRef.value = true
})
onUnmounted(() => {
  clearTimeout(timer)
})
</script>
