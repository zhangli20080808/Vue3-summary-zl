/**
属性设计
 */

import { ExtractPropTypes, PropType } from 'vue'

export const checkboxProps = {
  // 选中项绑定值
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>
  },
  indeterminate: Boolean,
  disabled: Boolean,
  // 有slot优先使用slot
  label: {
    type: String as PropType<string>
  }
} as const

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number) => value,
  change: (value: boolean) => value
}

export type CheckboxEmits = typeof checkboxEmits
