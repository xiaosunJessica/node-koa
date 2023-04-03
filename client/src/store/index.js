/*
 * TencentBlueKing is pleased to support the open source community by making
 * 蓝鲸智云 - PaaS 平台 (BlueKing - PaaS System) available.
 * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * We undertake not to change the open source license (MIT license) applicable
 * to the current version of the project delivered to anyone in the future.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import deploy from './modules/deploy';

Vue.use(Vuex);

const state = {
  userFeature: {},
  platformFeature: {},
  curAppCode: '',
  curAppInfo: {
    feature: {}
  },
  curAppModule: {},
  curAppDefaultModule: {},
  curAppModuleList: [],
  appInfo: {},
  pluginInfo: {},

  isAppLoading: true,
  canCreateModule: true,
  loadingConf: {
    speed: 2,
    primaryColor: '#f5f6fa',
    secondaryColor: '#FAFAFC'
  },
  localLanguage: '',
  navType: {},
  applyUrl: '',
  envEventData: ['stag', 'prod']
};

const getters = {

};

const mutations = {
  updateUserFeature (state, data) {
    state.userFeature = data;

    // 将平台功能合并到用户功能
    for (const key in state.platformFeature) {
      state.userFeature[key] = state.platformFeature[key];
    }

    const appCode = state.curAppCode;
    if (appCode && state.appInfo[appCode]) {
      // 合并用户功能开关和应用功能开关
      const appFeature = state.appInfo[appCode]['feature'] || {};
      state.appInfo[appCode]['feature'] = {
        ...state.userFeature,
        ...state.platformFeature,
        ...appFeature
      };
    }
  },
  updatePlatformFeature (state, data) {
    state.platformFeature = data;
    // 将平台功能合并到用户功能
    for (const key in data) {
      state.userFeature[key] = data[key];
    }

    const appCode = state.curAppCode;
    if (appCode && state.appInfo[appCode]) {
      // 合并用户功能开关和应用功能开关
      const appFeature = state.appInfo[appCode]['feature'] || {};
      state.appInfo[appCode]['feature'] = {
        ...state.userFeature,
        ...state.platformFeature,
        ...appFeature
      };
    }
  },
  updateCanCreateModule () {
    // state.canCreateModule = flag
  },
  updateAppLoading (state, data) {
    state.isAppLoading = data;
  },
  updateAppFeature (state, { appCode, data }) {
    if (state.appInfo[appCode]) {
      // 合并用户功能开关和应用功能开关
      state.appInfo[appCode]['feature'] = {
        ...state.userFeature,
        ...state.platformFeature,
        ...data
      };
    }
  },
  // curAppInfo && curAppModule 的信息都在这里获取
  updateAppInfo (state, { appCode, moduleId, data }) {
    if (!data.feature) {
      data.feature = {};
    }

    if (appCode === state.curAppCode) {
      data.feature = state.curAppInfo.feature;
    }

    state.curAppInfo = data;
    state.curAppCode = appCode;
    state.appInfo[appCode] = data;
    state.curAppModuleList = data.application.modules;

    state.curAppDefaultModule = data.application.modules.find(module => {
      return module.is_default;
    });

    if (moduleId) {
      state.curAppModule = data.application.modules.find(module => {
        return module.name === moduleId;
      });
    } else if (data.application.modules.length) {
      state.curAppModule = state.curAppDefaultModule;
    }
  },
  addAppModule (state, data) {
    // state.curAppModuleList.push(data)
    state.curAppModule = data;
    state.curAppInfo.application.modules.push(data);
  },
  updateCurAppName (state, name) {
    state.curAppInfo.application.name = name;
  },
  updateCurDescAppStatus (state, status) {
    state.curAppInfo.feature.APPLICATION_DESCRIPTION = status;
  },
  updateCurAppProduct (state, product) {
    state.curAppInfo.product = product;
    state.curAppInfo.name = product.name;
    state.curAppInfo.application.name = product.name;
  },
  updateCurAppProductLogo (state, logo) {
    state.curAppInfo.application.logo_url = logo;
  },
  updateCurAppMarketPublished (state, flag) {
    if (state.curAppInfo.application && state.curAppInfo.application.config_info) {
      state.curAppInfo.application.config_info.market_published = flag;
    }
  },
  updateCurAppModule (state, data) {
    state.curAppModule = data;
  },
  updateCurAppModuleExposed (state, type) {
    state.curAppModule.exposed_url_type = type;
  },
  updateCurAppModuleIsDefault (state, moduleId) {
    state.curAppModuleList.forEach(modules => {
      modules.is_default = modules.id === moduleId;
    });
  },
  updateCurAppByCode (state, { appCode, moduleId }) {
    if (state.appInfo[appCode]) {
      const data = state.appInfo[appCode];
      state.curAppInfo = data;
      state.curAppModuleList = data.application.modules;

      state.curAppDefaultModule = data.application.modules.find(module => {
        return module.is_default;
      });

      if (moduleId) {
        state.curAppModule = data.application.modules.find(module => {
          return module.name === moduleId;
        });
      } else if (data.application.modules.length) {
        state.curAppModule = state.curAppDefaultModule;
      }
    }
  },
  updateLocalLanguage (state, data) {
    state.localLanguage = data;
  },
  updateNavType (state, data) {
    state.navType = data;
  },
  updateApplyUrl (state, data) {
    state.applyUrl = data;
  },
  updataEnvEventData (state, data) {
    if (data.length) {
      state.envEventData.push(...data);
    } else {
      state.envEventData = [];
    }
  }
};

// 公共 actions
const actions = {
  /**
     * 获取用户功能开关详情
     */
  getUserFeature ({ commit,  }, config = {}) {
    const url = `/api/accounts/feature_flags/`;
    return axios.get(url, config).then(data => {
      commit('updateUserFeature', data);
    });
  },

  /**
     * 获取平台功能开关详情
     */
  getPlatformFeature ({ commit }, config = {}) {
    const url = `/api/platform/feature_flags/`;
    return axios.get(url, config).then(data => {
      commit('updatePlatformFeature', data);
    });
  },

  /**
     * 获取应用功能开关详情
     */
  getAppFeature ({ commit }, { appCode }, config = {}) {
    const url = `/api/bkapps/applications/feature_flags/${appCode}/`;
    return axios.get(url, config).then(data => {
      commit('updateAppFeature', { appCode, data });
    });
  },

  /**
     * 取消应用收藏
     */
  deleteAppMarked (params, { appCode }, config = {}) {
    const url = `/api/bkapps/accounts/marked_applications/${appCode}`;
    return axios.delete(url, config);
  },

  /**
     * 应用收藏
     */
  addAppMarked (params, { appCode }) {
    const url = `/api/bkapps/accounts/marked_applications/`;
    return axios.post(url, {
      application: appCode
    });
  },

  /**
     * 获取应用信息
     *
     * @param {Number} appCode 应用code
     */
  getAppInfo ({ commit }, { appCode, moduleId }) {
    // const url = `/api/bkapps/applications/${appCode}/`;
    commit('updateAppLoading', true);

    return new Promise((resolve) => {
      const data = {"role":{"id":2,"name":"administrator"},"application":{"id":"dff84113-c988-4c1c-9d4c-5ab661c36540","name":"python学习","region_name":"默认版","logo_url":"https://bkpaas.ce.bktencent.com/static/images/default_logo.png","config_info":{"engine_enabled":true,"can_create_extra_modules":true,"require_templated_source":true,"confirm_required_when_publish":true,"market_published":false},"modules":[{"id":"9a7b2841-b56e-4d76-8464-642b0a6842ca","repo":{"source_type":"bare_git","type":"bare_git","trunk_url":"https://gitee.com/syqin/python_study.git","repo_url":"https://gitee.com/syqin/python_study.git","source_dir":"","repo_fullname":"syqin/python_study","diff_feature":{"method":null,"enabled":false},"linked_to_internal_svn":false,"display_name":"原生 Git"},"repo_auth_info":{"username":"lovelysyq1991225@qq.com"},"web_config":{"templated_source_enabled":true,"runtime_type":"buildpack"},"template_display_name":"Django3.x 框架","source_origin":1,"clusters":{"prod":{"name":"default-main","is_default":true,"ingress_config":{"app_root_domains":[{"name":"apps.ce.bktencent.com","reserved":false,"https_enabled":false}],"sub_path_domains":[{"name":"apps.ce.bktencent.com","reserved":false,"https_enabled":false}],"frontend_ingress_ip":"10.0.1.84","port_map":{"http":80,"https":443}},"bcs_cluster_id":"BCS-K8S-00000","type":"normal","feature_flags":{"ENABLE_EGRESS_IP":true,"ENABLE_MOUNT_LOG_TO_HOST":true,"INGRESS_USE_REGEX":true}},"stag":{"name":"default-main","is_default":true,"ingress_config":{"app_root_domains":[{"name":"apps.ce.bktencent.com","reserved":false,"https_enabled":false}],"sub_path_domains":[{"name":"apps.ce.bktencent.com","reserved":false,"https_enabled":false}],"frontend_ingress_ip":"10.0.1.84","port_map":{"http":80,"https":443}},"bcs_cluster_id":"BCS-K8S-00000","type":"normal","feature_flags":{"ENABLE_EGRESS_IP":true,"ENABLE_MOUNT_LOG_TO_HOST":true,"INGRESS_USE_REGEX":true}}},"region":"default","created":"2023-04-02 18:04:46","updated":"2023-04-02 18:04:46","owner":"036598bcc5c912cdf792a6e7","name":"default","is_default":true,"language":"Python","source_init_template":"dj2_hello_world","exposed_url_type":1,"user_preferred_root_domain":null,"last_deployed_date":"2023-04-02 21:05:15","creator":"036598bcc5c912cdf792a6e7","application":"dff84113-c988-4c1c-9d4c-5ab661c36540"}],"region":"default","created":"2023-04-02 18:04:46","updated":"2023-04-02 18:04:46","owner":"036598bcc5c912cdf792a6e7","code":"python-study","name_en":"python学习","type":"default","is_smart_app":false,"is_scene_app":false,"language":"Python","creator":"036598bcc5c912cdf792a6e7","is_active":true,"is_deleted":false,"last_deployed_date":"2023-04-02 21:05:15"},"product":null,"marked":false,"web_config":{"engine_enabled":true,"can_create_extra_modules":true,"require_templated_source":true,"confirm_required_when_publish":true,"market_published":false}}

      return resolve(data)
    }).then(response => {
      if (!moduleId) {
        moduleId = response.application.modules.find(module => module.is_default).name;
      }
      commit('updateAppInfo', { appCode, moduleId, data: response });
      return response;
    }).catch((err) => {
      if (err.apply_url_for_dev) {
        commit('updateApplyUrl', err.apply_url_for_dev);
      }
    }).finally(() => {
      commit('updateAppLoading', false);
    });
  },

  /**
     * 获取应用列表
     *
     * @param {Object} params 参数配置
     */
  getAppList (params, { url }, config = {}) {
    return axios.get(url, config);
  },

  /**
     * 对应用进行关注标记
     *
     * @param {Object} params 参数，包括appCode, isMarked
     */
  toggleAppMarked ({ dispatch }, { appCode, isMarked }) {
    if (isMarked) {
      return dispatch('deleteAppMarked', { appCode });
    } else {
      return dispatch('addAppMarked', { appCode });
    }
  },

  /**
     * 获取应用语言类型数量
     */
  getAppsByLang (params, config = {}) {
    const url = `/api/bkapps/applications/summary/group_by_field/?field=language&include_inactive=false`;
    return axios.get(url, config);
  },

  /**
     * 获取应用版本类型数量
     */
  getAppsByRegion (params, config = {}) {
    const url = `/api/bkapps/applications/summary/group_by_field/?field=region&include_inactive=false`;
    return axios.get(url, config);
  },

  /**
     * 获取应用类型信息
     * @param {String} region 应用类型
     */
  getAppRegion (params, region) {
    const url = `/api/regions/${region}/`;
    return axios.get(url, {}, { fromCache: true });
  },

  /**
     * 根据不同的代码库获取git repos列表
     * @param {String} sourceControlType 源码仓库类型
     */
  getRepoList (params, { sourceControlType }, config = {}) {
    const url = `/api/sourcectl/${sourceControlType}/repos/`;
    return axios.get(url, config);
  },

  /**
     * 获取版本日志
     */
  getVersionLog (params, config = {}) {
    const url = `/api/changelogs/`;
    return axios.get(url, config);
  },

  /**
     * 切换语言
     */
  switchLanguage (params, { data }, config = {}) {
    const url = `/i18n/setlang/`;
    return axios.post(url, data, config);
  }

};

export default new Vuex.Store({
  // 模块
  modules: {
    // region,
    // application,
    deploy,
    // packages,
    // search,
    // sourcectl,
    // log,
    // baseInfo,
    // entryConfig,
    // module,
    // processes,
    // market,
    // member,
    // envVar,
    // order,
    // ip,
    // analysis,
    // user,
    // createApp,
    // service,
    // devopsAuth,
    // alarm,
    // docuManagement,
    // cloudApi,
    // credential,
    // // 插件开发者中心
    // plugin,
    // pluginMembers
  },
  state,
  getters,
  mutations,
  actions
});
