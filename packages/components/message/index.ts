/**
Button 组件是可以单独引用的
import { Button } from 'zl-xxx'
app.use(Button)
*/
import { withInstall } from '@zhangli-hua/utils/with-install'
import _Message from './message.vue'








const Message = withInstall(_Message)

export default Message

declare module 'vue' {
  export interface GlobalComponents {
    ZMessage: typeof Message
  }
}

export * from './message'
