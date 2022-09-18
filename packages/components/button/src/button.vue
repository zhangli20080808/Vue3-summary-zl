<script setup lang="ts">
import { createNamespace } from '@zhangli-hua/utils/create'
import { buttonProps } from './button'
defineOptions({
  name: 'z-button'
})
const bem = createNamespace('button')
const props = defineProps(buttonProps)
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
  >
    <slot></slot>
  </button>
</template>
