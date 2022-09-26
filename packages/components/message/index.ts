/**
Message 组件是可以单独引用的
import { Message } from 'zl-xxx'
app.use(Message)
*/
import { withInstall } from '@zhangli-hua/utils/with-install'
import _Message from './message'

const Message = withInstall(_Message)

export { Message }

export default Message

declare module 'vue' {
  export interface GlobalComponents {
    ZMessage: typeof Message
  }
}

export * from './type'
