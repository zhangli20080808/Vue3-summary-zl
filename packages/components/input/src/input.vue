<template>
  <div :class="[bem.b()]">
    <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
      <slot name="prepend"></slot>
    </div>
    <div :class="bem.b()">
      <span v-if="slots.prefixIcon">
        <slot name="prefixIcon"></slot>
      </span>
      <input type="text" />
    </div>
    <div v-if="slots.append" :class="bem.be('group', 'append')">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createNamespace } from '@zhangli-hua/utils/create'
import { useSlots } from 'vue'

const bem = createNamespace('input')
defineOptions({
  name: 'z-input'
})
const slots = useSlots()
</script>
