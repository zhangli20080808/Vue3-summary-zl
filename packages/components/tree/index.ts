import { withInstall } from '@zhangli-hua/utils/with-install';
import _Tree from './src/tree.vue';

const Tree = withInstall(_Tree);

export default Tree;

declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree;
  }
}
