import Vue from 'vue';
import App from './App.vue';
import router from './router';
import request from './utils/axios';
import moment from 'moment';
import store from '@/store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/language/i18n';
import {
  bkBadge,
  bkButton,
  bkLink,
  bkCheckbox,
  bkCheckboxGroup,
  bkCol,
  bkCollapse,
  bkCollapseItem,
  bkContainer,
  bkDatePicker,
  bkDialog,
  bkDropdownMenu,
  bkException,
  bkForm,
  bkFormItem,
  bkInfoBox,
  bkInput,
  bkLoading,
  bkMessage,
  bkNavigation,
  bkNavigationMenu,
  bkNavigationMenuItem,
  bkNotify,
  bkOption,
  bkOptionGroup,
  bkPagination,
  bkPopover,
  bkProcess,
  bkProgress,
  bkRadio,
  bkRadioGroup,
  bkRoundProgress,
  bkRow,
  bkSearchSelect,
  bkSelect,
  bkOverflowTips,
  bkSideslider,
  bkSlider,
  bkSteps,
  bkSwitcher,
  bkTab,
  bkTabPanel,
  bkTable,
  bkTableColumn,
  bkTagInput,
  bkTimePicker,
  bkTimeline,
  bkTransfer,
  bkTree,
  bkUpload,
  bkClickoutside,
  bkTooltips,
  bkSwiper,
  bkRate,
  bkAnimateNumber,
  bkVirtualScroll,
  bkPopconfirm,
  bkAlert,
  bkCard,
  bkTag
} from 'bk-magic-vue';
import { PLATFORM_CONFIG } from './paas_static.js';
Vue.use(ElementUI);
Vue.prototype.$http = request;
Vue.prototype.$moment = moment;
window.GLOBAL_CONFIG = {
  ...PLATFORM_CONFIG,
  ...window.GLOBAL_CONFIG
};
Vue.prototype.GLOBAL = window.GLOBAL_CONFIG;

Vue.use(bkBadge);
Vue.use(bkButton);
Vue.use(bkLink);
Vue.use(bkCheckbox);
Vue.use(bkCheckboxGroup);
Vue.use(bkCol);
Vue.use(bkCollapse);
Vue.use(bkCollapseItem);
Vue.use(bkContainer);
Vue.use(bkDatePicker);
Vue.use(bkDialog, {
  headerPosition: 'left'
});
Vue.use(bkDropdownMenu);
Vue.use(bkException);
Vue.use(bkForm);
Vue.use(bkFormItem);
Vue.use(bkInput);
Vue.use(bkNavigation);
Vue.use(bkNavigationMenu);
Vue.use(bkNavigationMenuItem);
Vue.use(bkOption);
Vue.use(bkOptionGroup);
Vue.use(bkPagination);
Vue.use(bkPopover);
Vue.use(bkProcess);
Vue.use(bkProgress);
Vue.use(bkRadio);
Vue.use(bkRadioGroup);
Vue.use(bkRoundProgress);
Vue.use(bkRow);
Vue.use(bkSearchSelect);
Vue.use(bkSelect);
Vue.use(bkSideslider);
Vue.use(bkSlider);
Vue.use(bkSteps);
Vue.use(bkSwitcher);
Vue.use(bkTab);
Vue.use(bkOverflowTips);
Vue.use(bkTabPanel);
Vue.use(bkTable);
Vue.use(bkTableColumn, {
  showOverflowTooltip: true
});
Vue.use(bkTagInput, {
  tooltipKey: 'name'
});
Vue.use(bkTimePicker);
Vue.use(bkTimeline);
Vue.use(bkTransfer, {
  showOverflowTips: true
});
Vue.use(bkTree);
Vue.use(bkUpload);
Vue.use(bkSwiper);
Vue.use(bkRate);
Vue.use(bkAnimateNumber);
Vue.use(bkVirtualScroll);
Vue.use(bkPopconfirm);
// directives use
Vue.use(bkClickoutside);
Vue.use(bkTooltips);
Vue.use(bkLoading);
// Vue.use(bkOverflowTips)
Vue.use(bkAlert);
Vue.use(bkCard);
Vue.use(bkTag);


Vue.prototype.$bkInfo = bkInfoBox;
Vue.prototype.$bkMessage = function (config) {
  config.ellipsisLine = 0;
  bkMessage(config);
};
Vue.prototype.$bkNotify = bkNotify;

Vue.prototype.$paasMessage = function (conf) {
  conf.offsetY = 52;
  conf.limit = 1; // 消息的个数限制
  if (conf.type === 'notify') {
    this.$bkNotify(conf);
  } else {
    conf.ellipsisLine = 0;
    this.$bkMessage(conf);
  }
};

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
