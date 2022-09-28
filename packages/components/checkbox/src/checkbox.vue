<template lang="">
  <label :class="bem.b()">
  <span>
    <input type="text">
  </span>
  <span v-if="$s"></span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from '@zhangli-hua/utils/create'
import { checkboxProps } from './checkbox';

const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
</script>
