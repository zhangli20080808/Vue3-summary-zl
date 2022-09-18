import _Button from './src/button.vue'
import { withInstall } from '@zhangli-hua/utils/with-install'

const Button = withInstall(_Button)

export default Button

declare module 'vue' {
  export interface GlobalComponents {
    zButton: typeof Button
  }
}

export * from './src/button'
