# Vue3-component
Vue3-component base component learninng
### 初始化操作
```js
npm install pnpm -g
// 初始化package.json配置文件 私有库
pnpm init
// vue+typescript
pnpm install vue typescript 添加全局依赖

// 使用  pnpm 必须建立 .npmrc文件 shamefully-hoist = true 负责安装的模块无法放置到node_module目录下

// 默认安装结束会将模块安装到.pnpm文件下 typescript和vue是直接暴漏在node_module下的

// 但是一些vue中的公共库我们是需要使用的，在开发的时候还是希望能直接引用，所以需要将这些包提升

// 公共模块的提升 借助 .npmrc文件 没有安装但可以使用-幽灵依赖
shamefully-hoist = true

// 重新安装依赖 
pnpm install
// 初始化ts文件
pnpm tsc / npx tsc --init

```
### 多仓库管理
```js
touch .pnpm-workspace
// 配置内容
packages:
  - play # 存放我们组件测试的时候的代码
  - docs # 存放我们组件文档的
  - "packages/**"  // package下面都是包 

cd packages/components
pnpm init
// play、utils、theme-chalk等都需要 package.json
cd 根目录
pnpm init @@zhangli-cli-dev/components
```
