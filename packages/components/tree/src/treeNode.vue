<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node.isLeaf },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpand"
      >
        <z-icon size="25">
          <Switcher></Switcher>
        </z-icon>
      </span>
      <span> {{ node?.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Switcher from './icon/Switcher'
import ZIcon from '@zhangli-hua/components/icon'
import { createNamespace } from '@zhangli-hua/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmitts)
function handleExpand() {
  emit('toggle', props.node)
}
</script>
