<template>
  <div :class="bem.b()">message</div>
</template>
<script setup lang="ts">
// import { messageProps } from './type'
// import { Message } from './index'
import { createNamespace } from '@zhangli-hua/utils/create'
const bem = createNamespace('message')
// // const emit =  defineEmits(messageEmits)
// // const props = defineProps(messageProps)
// const showClick = () => {
//   // emit('click')
//   Message('我是')
// }
// // const show = () => {
// //   //
// // }

// // ['success','info','warning','error'].forEach(type=> {
// //   Message[type] = function (options) {
// //     return Message(options)

// //   }
// // })
</script>
