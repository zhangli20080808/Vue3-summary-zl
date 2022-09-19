import _Input from './src/input.vue'

import { withInstall } from '@zhangli-hua/utils/with-install'
const Input = withInstall(_Input)
export default Input

declare module 'vue' {
  export interface GlobalComponents {
    ZInput: typeof Input
  }
}

export * from './src/input'
