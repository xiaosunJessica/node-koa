// import BpmnIcon from "../components/common/BpmnIcon";
// import CollapseTitle from "../components/common/CollapseTitle";
// import EditItem from "../components/common/EditItem";
import LucideIcon from "./LucideIcon.vue";
// import NumberTag from "../components/common/NumberTag";

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
