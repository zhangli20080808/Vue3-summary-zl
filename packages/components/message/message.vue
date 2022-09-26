<template>
  <div>
    {{ message }}
  </div>
</template>
<script setup lang="ts">
import { messageEmits, messageProps } from './message'
// const emit =  defineEmits(messageEmits)
const props = defineProps(messageProps)
const showClick = () => {
  // emit('click')
  // Message.success({message:'hello'})
}
// const show = () => {
//   //
// }

// ['success','info','warning','error'].forEach(type=> {
//   Message[type] = function (options) {
//     return Message(options)

//   }
// })
</script>
