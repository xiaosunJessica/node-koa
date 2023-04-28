<script setup lang='ts'>
import groupBox from '../common/group-box.vue';
import renderIcon from '../common/render-icon.vue';
import RenderComponent from '../common/render-component.vue'
import MaterialConfig from '../../../../../element-materials/materials/index.js'
import { reactive, computed, watch, type Component } from 'vue';
const state = reactive({
  renderGroupComponentMap: {},
  searchList: []
})



const props = defineProps({
   baseComponent: {
    type: String,
    validator: function (value: string) {
      return ['bk', 'element', 'vant'].includes(value)
    }
  }
})
const groupList = computed(() => {
  const groupNameMap: {
    [key: string]: string;
  } = {
    bk: 'bkComponentGroupList',
    element: 'elementComponentGroupList',
    vant: 'vantComponentGroupList'
  }
  if (props.baseComponent) {
    return MaterialConfig[groupNameMap[props.baseComponent]]
  }
  return []
})
const componentList = computed(() => {
  return MaterialConfig[props.baseComponent]
})

const init = () => {
  const searchList: any = []

  const groupComponentMap: any = groupList.value.reduce((result: any, groupName: string) => {
    result[groupName] = []
    return result
  }, {})

  componentList.value.forEach((component: any) => {
    if (component.display === 'none' || !component.group) {
      return
    }
    searchList.push(component)
    groupComponentMap[component.group].push(component)
  })

  state.searchList = searchList
  // this.groupComponentMap = Object.freeze(groupComponentMap)
  state.renderGroupComponentMap = Object.freeze(groupComponentMap)
}
watch(() => props.baseComponent, () => {
  init()
}, { immediate: true })




</script>

<template>
 <group-box
    v-for="(comList, groupName) in state.renderGroupComponentMap"
    :key="groupName"
    :list="comList"
    :group-name="groupName">
    <!--slot展示内容-->
    <template
      #test="{ propsSlots }">
       <render-icon
          v-if="groupName === '图标集合'"
          :key="propsSlots.name"
          :data="propsSlots" />
        <render-component
          v-else
          :key="propsSlots.name"
          :data="propsSlots" />
    </template>
    <!-- <template v-for="component in comList">
      <render-icon
        v-if="groupName === '图标集合'"
        :key="component.name"
        :data="component" />
      <render-component
        v-else
        :key="component.name"
        :data="component" />
    </template> -->
  </group-box>
</template>

<style lang='scss' scoped>

</style>