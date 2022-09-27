import { createVNode, render, VNode } from 'vue'
import type { MessageParams } from './type'
import MessageComponent from './message.vue'
let instances: any[] = []
let seed = 1

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
  instances.forEach(item => {
    offset += item!.vnode.el!.offsetHeight + 20
  })
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const userClose = options.onClose
  const opts = {
    ...options,
    offset,
    onClose: () => {
      // 移除dom
      console.log('remove dom')
      userClose?.() // userClose && userClose()
      // 根据id移除对应的message
      instances = instances.filter(instance => instance.id !== id)
    },
    onDestroy: () => {
      render(null, container) // render移除dom
    }
  }

  // 此处肯定是对象
  // 渲染组件
  const vnode = createVNode(MessageComponent, opts)
  console.log(vnode, 'vm')
  // const handler = {
  //   close: () => {
  //     vnode.component!.exposed!.visible.value = false
  //   }
  // }
  const instance = {
    id,
    vnode,
    // handler
  }
  // vnode.props!.onDestroy = () => {
  //   render(null, container) // render移除dom
  // }
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  instances.push(instance)
}

export default Message
