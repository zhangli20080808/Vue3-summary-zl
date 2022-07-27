// 这里面准备组件相关的属性 和 ts的类型
// 通过vue提供的泛型 将组价的属性类型抽离出来 ExtractPropTypes 数组类型无法推断 再精细化，强制告诉外部类型 PropType
import { ExtractPropTypes, PropType } from 'vue';

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
