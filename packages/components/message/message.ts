import { ExtractPropTypes, PropType, VNode } from 'vue'
import { definePropType } from '@zhangli-hua/utils'
import { Mutable } from '@zhangli-hua/utils/typescript'
export const messageDefaults = {
  // customClass: '',
  // center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  id: '',
  message: '',
  type: 'success',
  offset: 16
} as const

export type IconPropType = 'info' | 'success' | 'warning' | 'error'
export const messageProps = {
  type: {
    type: String as PropType<IconPropType>,
    default: messageDefaults.message
  },
  // 每弹出一个框，就做一个标记
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  center: {
    type: Boolean
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  onClose: {
    type: definePropType<() => void>(Function)
  }
}

export const messageEmits = {
  destroy: () => true
}

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>

export type MessageProps = ExtractPropTypes<typeof messageProps>
export type MessageEmits = typeof messageEmits
