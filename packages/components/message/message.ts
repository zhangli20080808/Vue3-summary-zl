import { createVNode, render, VNode } from 'vue'
import type { MessageParams } from './type'
import MessageComponent from './message.vue'
const instances: VNode[] = []
/**
 * vue2中 - new Vue(render:()=>h(Message)).mount()
 * vue3中 - createNode(component) => render(component.container)
 * 思路 - 1.动态创建节点，手动挂载 2.将组件先变成虚拟节点 3. 然后在变成真实节点 render
 * @param options
 */
const Message = (options: MessageParams) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  // 处理偏移值
  let offset = options.offset || 20
  instances.forEach(vm => {
    offset += vm.el!.offsetHeight + 20
  })
  const userClose = options.onClose
  const opts = {
    ...options,
    offset,
    onClose: () => {
      // 移除dom
      console.log('remove dom')
      // 根据id移除对应的message
      userClose?.() // userClose && userClose()
    }
  }
  // 此处肯定是对象
  const container = document.createElement('div')
  // 渲染组件
  const vm = createVNode(MessageComponent, opts)
  vm.props!.onDestroy = () => {
    render(null, container) // render移除dom
  }
  render(vm, container)
  document.body.appendChild(container.firstElementChild!)
  instances.push(vm)
}

export default Message
