import { withInstall } from '@zhangli-hua/utils/with-install'
import _Tree from './src/tree.vue'

// 注册全局组件，能够使用use方法
const Tree = withInstall(_Tree)

export default Tree

// 为了在模版引用时，能够正确获取到Tree的类型
declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree
  }
}
