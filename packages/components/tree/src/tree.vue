<template>
  <div :class="bem.b()">
    <!-- 模版有自带的优化，如果自定义比较强的我们采用 tsx来编写 -->
    <z-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :loading-keys="loadingKeysRef"
      @toggle="toggleExpand"
    >
    </z-tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { createNamespace } from '@zhangli-hua/utils/create'
import { Key } from '@zhangli-hua/components/tree/src/tree'
import { ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps } from './tree'
import ZTreeNode from './treeNode.vue'
const bem = createNamespace('tree')

defineOptions({
  name: 'z-tree' // 定义组件名字
})

const props = defineProps(treeProps)

// 有了props 要对用户的数据进行格式化 ，格式化一个固定的结果
// label , key , children,

// 我们将props.data 格式化后放到tree中
const tree = ref<TreeNode[]>([])

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children获取孩子
    }
  }
}
const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        // 判断节点是否自带isLeaf 如果自带了 以自带的为准，如果没有自带的则看一下有没有children属性
        // 对 ||的增强操作  ?.  ??
        isLeaf: node.isLeaf ?? children.length == 0
      }
      if (children.length > 0) {
        // 有孩子再去递归孩子，将其格式化成treeNode类型
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traversal(data, parent)
  return result
}
// 监控数据变化，调用格式化方法。 一上来先格式化一次
watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)

// 希望将一颗树拍平， 点击还能实现展开操作
// 默认

// 需要展开的key 有哪些
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value // 要展开的keys有哪些
  // 最终拍平的节点
  const flattenNodes: TreeNode[] = [] // 这个就是拍平后的结果
  const nodes = tree.value || [] // 被格式化后的节点
  const stack: TreeNode[] = [] // 用于遍历树的栈  [40,30,31,32,41]
  // [40, 41]
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  // [41,50,40,30]
  // 深度遍历
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    if (expandedKeys.has(node.key)) {
      const children = node.children // [30,31,32];
      if (children) {
        for (let i = node.children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNodes
})

function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}
// 折叠功能
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
const loadingKeysRef = ref(new Set<Key>())
// 可以同时异步加载多个节点

function triggerLoading(node: TreeNode) {
  // 这个节点需要异步加载
  if (!node.children.length && !node.isLeaf) {
    // 如果没有加载过这个节点 就加载这个节点
    const loadingKeys = loadingKeysRef.value
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then(children => {
          // 修改原来的节点
          node.rawNode.children = children
          // 更新自定义的node
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}
// 展开功能
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  // 此处实现对应的onLoad的加载逻辑 不能疯狂点击，需要屏蔽 使用标识位解决
  // 这里应该实现对应的加载逻辑
  triggerLoading(node)
}
// 切换专刊
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  // 当前节点正在加载中，不能收起
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}
</script>
