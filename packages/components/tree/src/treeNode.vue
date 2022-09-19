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
        <z-icon size="18">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>
      <span> {{ node?.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Switcher from '@zhangli-hua/components/internal-icon/Switcher'
import ZIcon from '@zhangli-hua/components/icon'
import { createNamespace } from '@zhangli-hua/utils/create'
import { treeNodeEmits, treeNodeProps } from './tree'
import Loading from '@zhangli-hua/components/internal-icon/Loading'
import { computed } from 'vue'
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

const emit = defineEmits(treeNodeEmits)
function handleExpand() {
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key)
})
</script>
