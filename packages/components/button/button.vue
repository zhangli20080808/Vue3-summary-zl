<script setup lang="ts">
import { createNamespace } from '@zhangli-hua/utils/create'
import LoadingComponent from '@zhangli-hua/components/internal-icon/Loading'
import { useSlots } from 'vue'
import { buttonProps, buttonEmits } from './button'
defineOptions({
  name: 'z-button'
})
const bem = createNamespace('button') // z-button
defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const slots = useSlots()
const emitClick = (e: MouseEvent) => {
  emit('click', e)
}
const emitMouseDown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>

<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="emitClick"
    @mousedown="emitMouseDown"
  >
    <template v-if="iconPlacement === 'left'">
      <z-icon>
        <LoadingComponent v-if="loading" />
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </z-icon>
    </template>
    <slot></slot>
    <template v-if="iconPlacement === 'right'">
      <z-icon>
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <Component :is="slots.icon"></Component>
        </template>
      </z-icon>
    </template>
  </button>
</template>
