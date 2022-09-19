<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { TreeOption } from '@zhangli-hua/components/tree/src/tree'
import { ref } from 'vue'

// function createData(level = 4, parentKey = ''): any {
//   if (!level) return []
//   const arr = new Array(6 - level).fill(0)
//   return arr.map((_, idx: number) => {
//     const key = parentKey + level + idx
//     return {
//       xx: createLabel(level), // 显示的内容
//       key, // 为了唯一性
//       children: createData(level - 1, key) // 孩子
//     }
//   })
// }
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false // 这里isLeaf 为false 表示点击的时候动态的加载子节点
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}
function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}

const data = ref(createData())
console.log(data, 'init-data')

const handleLoad = (node: TreeOption) => {
  // 内部肯定需要将展开的节点传递给我
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        // 这个数据会作为当前展开的node的children属性
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}
const handleClick = e => {
  console.log('click')
}
</script>

<template>
  <!-- <Icon :color="" :size=""></Icon> -->
  <!-- <z-icon :color="'red'" :size="40"> hello world </z-icon> -->
  <!-- <z-icon :color="'yellow'" :size="20"> -->
  <!-- <AddCircle></AddCircle> -->
  <!-- </z-icon> -->
  <!-- <z-icon :color="'yellow'" :size="40"> -->
  <!-- <AddCircle></AddCircle>
  </z-icon> -->
  <!-- 在使用树组件的时候 会传递一个树型的结构 -->

  <!-- <z-tree
    :data="data"
    label-field="xx"
    key-field="key"
    children-field="children"
    :on-load="handleLoad"
  ></z-tree> -->

  <z-tree :data="data" :on-load="handleLoad"></z-tree>
  <z-button
    type="primary"
    size="small"
    :round="true"
    :disabled="false"
    icon-placement="left"
    @click="handleClick"
  >
    vue3按钮
    <template #icon>
      <z-icon>
        <AddCircle></AddCircle>
      </z-icon>
    </template>
  </z-button>
</template>
