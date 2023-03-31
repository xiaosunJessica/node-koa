<script setup>
  var getEditorConfig = {}, keyboardModelVisible;
</script>
<template>
  <el-button-group>
    <el-button
      v-if="getEditorConfig && getEditorConfig.useMock"
      v-r-popover:processMock
      class="el-button__no-padding"
      @click="mockSimulationToggle"
    >
      <lucide-icon name="Bot" :size="16" />
      <el-popover
        ref="processMock"
        content="开启/关闭流程模拟"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
      />
    </el-button>
    <el-button
      v-if="getEditorConfig && getEditorConfig.useMinimap"
      v-r-popover:minimapToggle
      class="el-button__no-padding"
      @click="minimapToggle"
    >
      <lucide-icon name="Map" :size="16" />
      <el-popover
        ref="minimapToggle"
        content="展开/收起小地图"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
      />
    </el-button>
    <el-button
      v-if="getEditorConfig && getEditorConfig.useLint"
      v-r-popover:lintToggle
      class="el-button__no-padding"
      @click="lintToggle"
    >
      <lucide-icon name="FileCheck" :size="16" />
      <el-popover
        ref="lintToggle"
        content="开启/关闭流程校验"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
      />
    </el-button>
    <el-button
      v-r-popover:eventToggle
      class="el-button__no-padding"
      @click="eventModelVisible = true"
    >
      <lucide-icon name="Podcast" :size="16" />
      <el-popover
        ref="eventToggle"
        content="查看bpmn事件"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
      />
    </el-button>
    <el-button
      v-r-popover:keyboard
      class="el-button__no-padding"
      @click="keyboardModelVisible = true"
    >
      <lucide-icon name="Keyboard" :size="16" />
      <el-popover
        ref="keyboard"
        content="键盘快捷键"
        placement="bottom"
        trigger="hover"
        popper-class="button-popover"
      />
    </el-button>

    <el-dialog
      v-model:visible="eventModelVisible"
      title="Bpmn.js 当前已注册事件"
      width="560px"
      append-to-body
      destroy-on-close
    >
      <div class="event-listeners-box">
        <div class="listener-search">
          <el-input
            v-model="listenerFilter"
            placeholder="事件名称关键字"
            clearable
          />
        </div>
        <div class="event-listeners-box">
          <p
            class="listener-item"
            v-for="(name, index) in visibleListeners"
            :key="name"
          >
            {{ `${index + 1}：${name}` }}
          </p>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      v-model:visible="keyboardModelVisible"
      title="键盘快捷键"
      width="560px"
      append-to-body
      destroy-on-close
    >
      <div class="shortcut-keys-model">
        <p>Undo</p>
        <p>Ctrl + Z</p>
        <p>Redo</p>
        <p>Ctrl + Shift + Z / ctrl + Y</p>
        <p>Select All</p>
        <p>Ctrl + A</p>
        <p>Zoom</p>
        <p>Ctrl + Mouse Wheel</p>
        <p>Scrolling (Vertical)</p>
        <p>Mouse Wheel</p>
        <p>Scrolling (Horizontal)</p>
        <p>Shift + Mouse Wheel</p>
        <p>Direct Editing</p>
        <p>E</p>
        <p>Hand Tool</p>
        <p>H</p>
        <p>Lasso Tool</p>
        <p>L</p>
        <p>Space Tool</p>
        <p>S</p>
      </div>
      <div class="shortcut-keys-model" v-if="templateChooser">
        <p>Replace Tool</p>
        <p>R</p>
        <p>Append anything</p>
        <p>A</p>
        <p>Create anything</p>
        <p>N</p>
      </div>
    </el-dialog>
  </el-button-group>
</template>
