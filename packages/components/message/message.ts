import { PropType, VNode } from 'vue'
import { definePropType } from '@zhangli-hua/utils'
// type 类型  info/success/warning/error

export const messageDefaults = {
  // customClass: '',
  // center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  message: '',
  type: 'success'
} as const

export type IconPropType = 'info' | 'success' | 'warning' | 'error'
export const messageProps = {
  type: {
    type: String as PropType<IconPropType>,
    default: 'success'
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  }
}
export const messageEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
  // ...
}
