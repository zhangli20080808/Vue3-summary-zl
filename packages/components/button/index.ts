import { withInstall } from '@zhangli-hua/utils/with-install'
import _Button from './button.vue'

const Button = withInstall(_Button)

export default Button

declare module 'vue' {
  export interface GlobalComponents {
    ZButton: typeof Button
  }
}

export * from './button'
