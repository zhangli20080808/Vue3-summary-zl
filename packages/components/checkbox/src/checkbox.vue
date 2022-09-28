<template>
  <label :class="bem.b()">
    <span>
      <input type="checkbox" />
    </span>
    <!-- 如果存在slot优先slot，不然label -->
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@zhangli-hua/utils/create'
import { checkboxProps } from './checkbox'

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
defineOptions({
  name: 'z-checkbox'
})
</script>
