// 存储组件的的属性和相关事件 类型定义
import { ExtractPropTypes, PropType } from 'vue'

// size 组件的大小
// type 颜色展现类型
// round 是否圆角按钮
// loading 是否加载中状态
// disabled 是否禁用状态
// native-type 原生 type 属性
// icon-placement 图标的位置

export type Size = 'small' | 'middle' | 'large'
export type Type =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
export type NativeType = 'button' | 'submit' | 'reset'
export type Placement = 'left' | 'right'

export const buttonProps = {
  size: String as PropType<Size>,
  type: {
    type: String as PropType<Type>,
    validator: (val: string) => {
      return [
        'primary',
        'success',
        'warning',
        'danger',
        'info',
        'text'
      ].includes(val)
    },
    default: ''
  },
  round: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button'
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: 'left'
  }
} as const

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent
  // ...
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
