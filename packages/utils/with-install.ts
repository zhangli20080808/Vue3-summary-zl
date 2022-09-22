import { Plugin } from "vue";
export type SFCWithInstall<T> = T & Plugin;
export function withInstall<T>(Comp: T) {
  (Comp as SFCWithInstall<T>).install = function (app) {
    const { name } = Comp as unknown as { name: string };
    app.component(name, Comp); // 将组件注册成全局的组件
  };
  return Comp as SFCWithInstall<T>;
}
