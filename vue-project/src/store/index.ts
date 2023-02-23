import { createStore } from "vuex";
import { unObserver } from "@/utils/tool";

export interface State {
  editor: any;
  globalData: any;
}

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      editor: {},
      globalData: {
        _modeler: {
          a: 1,
        },
      },
    };
  },
  getters: {
    //  editor
    getEditor: (state) => state.editor,
    getProcessDef: (state) => ({
      processName: state.editor.processName,
      processId: state.editor.processId,
    }),
    getProcessEngine: (state) => state.editor.processEngine,
    getEditorConfig: (state) => {
      return Object.keys(state.editor).reduce((config: any, key) => {
        if (!["processName", "processId", "processEngine"].includes(key)) {
          config[key] = state.editor[key];
        }
        return config;
      }, {});
    },

    // modeler
    getModeler: (state) => state.globalData._modeler,
    getModeling: (state) =>
      state.globalData._modeler
        ? state.globalData._modeler.get("modeling")
        : undefined,
    getActive: (state) => state.globalData.activeElement,
  },
  mutations: {
    // editor
    setConfiguration(state, conf) {
      state.editor = { ...state.editor, ...conf };
    },

    clearGlobalDataState(state) {
      state.globalData = {};
    },
    /**
     * @param state
     * @param modeler { object }
     */
    setModeler(state, modeler) {
      state.globalData._modeler = unObserver(modeler);
    },
    /**
     * @param state
     * @param key { string }
     * @param module { object }
     */
    // setModules(state, { key, module }) {
    //   // state.globalData[`_${key}`] = Object.freeze(module);
    // },
    /**
     * @param state
     * @param id { string }
     * @param element { object }
     */
    setElement(state, { element, id }) {
      state.globalData.activeElement = { element: unObserver(element), id };
    },
  },
});

export default store;
