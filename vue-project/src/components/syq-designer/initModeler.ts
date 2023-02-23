import Modeler from "bpmn-js/lib/Modeler";
import EventEmitter from "@/utils/EventEmitter";
// import EnhancementContextmenu from "../additional-components/EnhancementContextmenu";
// import { addExtensionProperty } from "../bo-utils/extensionPropertiesUtil";
import { unObserver } from "@/utils/tool";

export default function (designerDom: any, moduleAndExtensions: any, context: any) {
  const options = {
    container: designerDom,
    additionalModules: moduleAndExtensions[0] || [],
    moddleExtensions: moduleAndExtensions[1] || {},
    ...moduleAndExtensions[2]
  };

  // 清除旧 modeler
  context.getModeler && context.getModeler.destroy();
  context.$store.commit("clearBpmnState");

  const modeler = new Modeler(options);

  context.$store.commit("setModeler", modeler);

  EventEmitter.emit("modeler-init", modeler);

  context.events?.forEach((event: any) => {
    modeler.on(event, function (eventObj: any) {
      const eventName = event.replace(/\./g, "-");
      const element = eventObj ? eventObj.element : null;
      context.$emit(eventName, unObserver({ element, eventObj }));
    });
  });

  modeler.on("commandStack.changed", async (event: any) => {
    try {
      const { xml } = await modeler.saveXML({ format: true });

      context.$emit("update:xml", xml);
      context.$emit("command-stack-changed", event);
    } catch (error) {
      console.log(error)
    }
  });

  // 右键菜单
  // EnhancementContextmenu(modeler, context.getEditor);

  // 功能测试部分，可删除
  modeler.on("commandStack.elements.create.preExecute", (event: any) => {
    console.log("create", event);
    const {
      context: { elements }
    } = event;
    if (elements[0] && elements[0].type === "bpmn:UserTask") {
      // addExtensionProperty(elements[0], { name: "111", value: "1231" });
    }
    return event;
  });
  modeler.on("commandStack.shape.replace.preExecute", (event: any) => {
    console.log("replace", event);
    const {
      context: { newShape, newData }
    } = event;
    if (newData && newData.type === "bpmn:UserTask") {
      // addExtensionProperty(newData.businessObject, { name: "111", value: "1231" });
    }
    return event;
  });

  console.log(modeler);

  return modeler;
}
