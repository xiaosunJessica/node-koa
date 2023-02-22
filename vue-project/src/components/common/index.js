// import BpmnIcon from "@packages/components/common/BpmnIcon";
// import CollapseTitle from "@packages/components/common/CollapseTitle";
// import EditItem from "@packages/components/common/EditItem";
import LucideIcon from "./LucideIcon.vue";
// import NumberTag from "@packages/components/common/NumberTag";

const components = [
  LucideIcon,
  // BpmnIcon, CollapseTitle, EditItem, NumberTag
];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
