// ** 官方流程模拟 module
import TokenSimulationModule from "bpmn-js-token-simulation";
// camunda 官方侧边栏扩展
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from "bpmn-js-properties-panel";
// 官方扩展工具 元素模板选择
import ElementTemplateChooserModule from "@bpmn-io/element-template-chooser";
import ConnectorsExtensionModule from "bpmn-js-connectors-extension";
// 官方 默认点状背景
import Grid from "diagram-js/lib/features/grid-snapping/visuals";
// 流程图校验部分
import lintModule from "bpmn-js-bpmnlint";
import { resolver, rules } from "../additional-modules/Lint/bpmnlint";
// 小地图
import minimapModule from "diagram-js-minimap";

// moddle 定义文件
import activitiModdleDescriptors from "../moddle-extensions/activiti.json";
import camundaModdleDescriptors from "../moddle-extensions/camunda.json";
import flowableModdleDescriptors from "../moddle-extensions/flowable.json";
import miyueModdleDescriptors from "../moddle-extensions/miyue.json";

// 自定义扩展部分
import EnhancementPalette from "../additional-modules/Palette/EnhancementPalette";
import RewritePalette from "../additional-modules/Palette/RewritePalette";
import EnhancementContextPad from "../additional-modules/ContextPad/EnhancementContextPad";
import RewriteContextPad from "../additional-modules/ContextPad/RewriteContextPad";
import EnhancementRenderer from "../additional-modules/Renderer/EnhancementRenderer";
import RewriteRenderer from "../additional-modules/Renderer/RewriteRenderer";
import Rules from "../additional-modules/Rules";
import AutoPlace from "../additional-modules/AutoPlace";
import ElementFactory from "../additional-modules/ElementFactory";
import translate from "../additional-modules/Translate";

export default function (settings: any) {
  const modules = []; // modules 扩展模块数组
  let moddle = {}; // moddle 声明文件对象
  const options: any = {}; // modeler 其他配置

  // 配置 palette (可覆盖 paletteProvider 取消原生侧边栏)
  settings.paletteMode === "enhancement" && modules.push(EnhancementPalette);
  settings.paletteMode === "rewrite" && modules.push(RewritePalette);
  settings.paletteMode === "custom" && modules.push({ paletteProvider: ["type", function () {}] });

  // 配置 contextPad (可覆盖 contextPadProvider 取消原生上下文菜单)
  settings.contextPadMode === "enhancement" && modules.push(EnhancementContextPad);
  settings.contextPadMode === "rewrite" && modules.push(RewriteContextPad);

  // 配置 自定义渲染
  settings.rendererMode === "enhancement" && modules.push(EnhancementRenderer);
  if (settings.rendererMode === "rewrite") {
    modules.push(RewriteRenderer);
    options["bpmnRenderer"] = { ...(settings.customTheme || {}), useCurve: settings.useCurve };
  }

  // 配置模板选择弹窗（会影响默认 popupmenu）
  if (settings.templateChooser || settings.penalMode !== "custom") {
    modules.push(BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule);
    moddle = {};
    if (settings.penalMode !== "custom") {
      options["propertiesPanel"] = { parent: "#camunda-panel" };
      moddle["camunda"] = camundaModdleDescriptors;
    }
    if (settings.templateChooser) {
      modules.push(
        CloudElementTemplatesPropertiesProviderModule,
        ElementTemplateChooserModule,
        ConnectorsExtensionModule
      );
      options["exporter"] = {
        name: "element-template-chooser",
        version: "0.0.1"
      };
      options["connectorsExtension"] = {
        appendAnything: true
      };
    }
  }

  // 设置 lint 校验
  if (settings.useLint) {
    modules.push(lintModule);
    options["linting"] = {
      active: true,
      bpmnlint: {
        config: {
          rules: { ...rules, "task-required": "error" }
        },
        resolver
      }
    };
  }

  // 设置 lint 校验
  if (settings.useMinimap) {
    modules.push(minimapModule);
    options["minimap"] = {
      open: true
    };
  }

  // 设置 lint 校验
  if (settings.useMock) {
    modules.push(TokenSimulationModule);
  }

  // 官方网点背景
  if (settings.bg === "grid") {
    modules.push(Grid);
  }

  // 设置其他模块的启用
  if (settings.otherModule) {
    // 设置 自定义规则
    modules.push(Rules);

    modules.push(AutoPlace);

    // 设置键盘事件绑定
    options["keyboard"] = {
      bindTo: document
    };

    modules.push(ElementFactory);
    options["elementFactory"] = {
      "bpmn:Task": { width: 120, height: 120 },
      "bpmn:SequenceFlow": { width: 100, height: 80 }
    };
  }

  // 配置 翻译 与 流程模拟
  modules.push(translate);

  // 设置对应的 moddle 解析配置文件 ( 避免上面已经配置了 camunda )
  if (!Object.keys(moddle).length) {
    if (settings.processEngine === "activiti") moddle["activiti"] = activitiModdleDescriptors;
    if (settings.processEngine === "camunda") moddle["camunda"] = camundaModdleDescriptors;
    if (settings.processEngine === "flowable") moddle["flowable"] = flowableModdleDescriptors;
  }

  // 设置自定义属性
  moddle["miyue"] = miyueModdleDescriptors;

  return [modules, moddle, options];
}
