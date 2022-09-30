<template>
  <label :class="bem.b()">
    <span>
      <span :class="bem.e('input')">
        <input
          ref="inputRef"
          v-model="model"
          type="checkbox"
          :disabled="disabled"
          :value="model"
          @change="handleChange"
        />
      </span>
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
import { computed, watch, ref, onMounted } from 'vue'
import { checkboxProps, checkboxEmits } from './checkbox'
defineOptions({
  name: 'z-checkbox'
})
const bem = createNamespace('checkbox')
const props = defineProps(checkboxProps)
const emits = defineEmits(checkboxEmits)
const inputRef = ref<HTMLInputElement>()

// 计算勾选状态
const model = computed<any>({
  get() {
    // console.log(props.modelValue)
    return props.modelValue
  },
  set(val: number | string | boolean) {
    emits('update:modelValue', val)
  }
})
const indeterminate = (val: boolean) => {
  // console.log(val, '2')
  inputRef.value!.indeterminate = val
}
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.checked ? true : false
  emits('change', value)
}
watch(() => {
  // console.log('watch')
  return props.indeterminate
}, indeterminate)
onMounted(() => {
  indeterminate(props.indeterminate)
})
</script>
