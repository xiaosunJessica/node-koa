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

/*
 * 管理当前 app 部署相关的属性
 */
import axios from 'axios'

const state = {
  // 是否允许推广到应用市场, 一般只有接入登录的应用才允许
  // canPublishToMarket: false,
  availableBranch: '',
  productInfoProvided: false,

  confirmRequiredWhenPublish: false,
  availableType: 'branch'
};

const getters = {
  // canPublishToMarket: state => state.canPublishToMarket,
  productInfoProvided: state => state.productInfoProvided,
  availableBranch: state => state.availableBranch,
  confirmRequiredWhenPublish: state => state.confirmRequiredWhenPublish
};

const mutations = {
  updateDeploymentInfo: function (state, { key, value }) {
    state[key] = value;
  }
};

// actions
const actions = {
  checkProductInfoProvided ({ commit, state }, appCode) {
    return axios.get( `/api/bkapps/applications/${appCode}/`).then(response => {
      commit('updateDeploymentInfo', {
        key: 'confirmRequiredWhenPublish',
        value: response.web_config.confirm_required_when_publish
      });
      commit('updateDeploymentInfo', {
        key: 'productInfoProvided',
        value: !state.confirmRequiredWhenPublish || Boolean(response.product)
      });
    });
  },

  refreshAvailableBranch ({ commit }, { appCode, moduleId }) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/stag/released_state/`;
    return axios.get(url).then(res => {
      const branchData = res.deployment;
      if (branchData) {
        commit('updateDeploymentInfo', {
          key: 'availableBranch',
          value: branchData.repo.name
        });
        commit('updateDeploymentInfo', {
          key: 'availableType',
          value: branchData.repo.type
        });
        return `${branchData.repo.type}:${branchData.repo.name}`;
      } else {
        commit('updateDeploymentInfo', {
          key: 'availableBranch',
          value: ''
        });
        commit('updateDeploymentInfo', {
          key: 'availableType',
          value: 'branch'
        });
        return '';
      }
    }, () => {
      commit('updateDeploymentInfo', {
        key: 'availableBranch',
        value: ''
      });
      commit('updateDeploymentInfo', {
        key: 'availableType',
        value: 'branch'
      });
    });
  },

  updateAvailableBranch ({ commit }, availableBranch) {
    commit('updateDeploymentInfo', {
      key: 'availableBranch',
      value: availableBranch
    });
  },

  updateAvailableType ({ commit }, availableType) {
    commit('updateDeploymentInfo', {
      key: 'availableType',
      value: availableType
    });
  },

  /**
     * 获取部署的基本信息
     * @param {Object} params 请求参数：appCode, apiType, apiPackageSelected
     */
  getModuleRuntimeOverview (parmas, { appCode, moduleId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/runtime/overview`;
    return axios.get(url, config);
  },

  /**
     * 获取模块部署信息
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getModuleReleaseInfo ({ commit }, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/released_state/`;
    return axios.get(url, config).then(res => {
      if (!res.is_offlined && env === 'stag') {
        commit('updateDeploymentInfo', {
          key: 'availableBranch',
          value: res.deployment.repo.name
        });
        commit('updateDeploymentInfo', {
          key: 'availableType',
          value: res.deployment.repo.type
        });
      }
      return res;
    }).catch(res => {
      commit('updateDeploymentInfo', {
        key: 'availableBranch',
        value: ''
      });
      commit('updateDeploymentInfo', {
        key: 'availableType',
        value: 'branch'
      });
      return res;
    });
  },

  /**
     * 获取模块部署分支
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getModuleBranches (params, { appCode, moduleId }, config = { requestId: 'getModuleBranches' }) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/repo/branches/`;
    return axios.get(url, config);
  },

  /**
     * 部署模块
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  createDeployForModule (_params, { appCode, moduleId, env, params }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deployments/`;
    return axios.post(url, params, config);
  },

  /**
     * 获取模块部署结果
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getDeployResult (params, { appCode, moduleId, deployId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deployments/${deployId}/result/`;
    return axios.get(url, config);
  },

  /**
     * 获取git代码对比链接
     * @param {Object} params 请求参数：appCode, fromVersion, toVersion
     */
  getGitCompareUrl (params, { appCode, moduleId, fromVersion, toVersion }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/repo/commit-diff-external/${fromVersion}/${toVersion}/`;
    return axios.get(url, config);
  },

  /**
     * 获取svn代码提交记录
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getSvnCommits (params, { appCode, moduleId, fromVersion, toVersion }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/repo/commit-diff/${fromVersion}/${toVersion}/logs/`;
    return axios.get(url, config);
  },

  /**
     * 获取部署前条件准备情况
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getDeployPreparations (params, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deploy/preparations`;
    return axios.get(url, config);
  },

  /**
     * 模块下架
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  offlineApp (params, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/offlines/`;
    return axios.post(url, {}, config);
  },

  /**
     * 获取模块下架进度
     * @param {Object} params 请求参数：appCode, moduleId, offlineOperationId
     */
  getOfflineResult (params, { appCode, moduleId, offlineOperationId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/offlines/${offlineOperationId}/result/`;
    return axios.get(url, config);
  },

  /**
     * 检测模块下架进度状况，如果进行中需要拉起“获取模块下架进度”
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getOfflineStatus (params, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/offlines/resumable/`;
    return axios.get(url, config);
  },

  /**
     * 检测模块部署进度状况
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getDeployStatus (params, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deployments/resumable/`;
    return axios.get(url, config);
  },

  /**
     * 获取部署记录
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getDeployHistory (params, { appCode, moduleId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deploy_operations/lists/?`;
    return axios.get(url, config);
  },

  /**
     * 获取部署前各阶段详情
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getPreDeployDetail () {
    // const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deploy_phases/`;
    return new Promise((resolve) => {
      const data = [{"display_name":"准备阶段","type":"preparation","steps":[{"name":"解析应用进程信息","display_name":"解析应用进程信息","skipped":false},{"name":"上传仓库代码","display_name":"上传仓库代码","skipped":false},{"name":"配置资源实例","display_name":"配置资源实例","skipped":false}],"display_blocks":{"source_info":{"source_type":"bare_git","type":"bare_git","trunk_url":"https://gitee.com/syqin/python_study.git","repo_url":"https://gitee.com/syqin/python_study.git","source_dir":"","repo_fullname":"syqin/python_study","diff_feature":{"method":null,"enabled":false},"linked_to_internal_svn":false,"display_name":"原生 Git"},"services_info":[],"prepare_help_docs":[{"title":"应用进程概念介绍以及如何使用","location":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/process_procfile#section","short_description":"关于应用进程的简单介绍，内容包含 Procfile","link":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/process_procfile#section","name":"应用进程概念介绍以及如何使用","text":"应用进程概念介绍以及如何使用","description":"关于应用进程的简单介绍，内容包含 Procfile"},{"title":"示例：如何为 Python 应用添加 celery 后台任务进程","location":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/process_procfile#什么是procfile","short_description":"","link":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/process_procfile#什么是procfile","name":"示例：如何为 Python 应用添加 celery 后台任务进程","text":"示例：如何为 Python 应用添加 celery 后台任务进程","description":""}]}},{"display_name":"构建阶段","type":"build","steps":[{"name":"下载代码","display_name":"下载代码","skipped":false},{"name":"加载缓存","display_name":"加载缓存","skipped":false},{"name":"构建应用","display_name":"构建应用","skipped":false},{"name":"检测进程类型","display_name":"检测进程类型","skipped":false},{"name":"制作打包构件","display_name":"制作打包构件","skipped":false},{"name":"上传缓存","display_name":"上传缓存","skipped":false}],"display_blocks":{"runtime_info":{"image":"蓝鲸基础镜像","slugbuilder":null,"slugrunner":null,"buildpacks":[{"id":2,"display_name":"Python","description":"默认 Python 版本为3.10.5","region":"default","created":"2022-12-08 20:25:52","updated":"2023-03-08 11:07:48","language":"Python","type":"tar","name":"bk-buildpack-python","display_name_zh_cn":"Python","display_name_en":"Python","address":"https://bkrepo.ce.bktencent.com/generic/bkpaas/bkpaas3-platform-assets/runtimes/heroku-18/buildpacks/bk-buildpack-python-v213.tar","version":"v213","is_hidden":false,"description_zh_cn":"默认 Python 版本为3.10.5","description_en":"The default Python version is 3.10.5"}]},"build_help_docs":[{"title":"如何使用部署前置命令","location":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/release_hooks","short_description":"","link":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/release_hooks","name":"如何使用部署前置命令","text":"如何使用部署前置命令","description":""}]}},{"display_name":"部署阶段","type":"release","steps":[{"name":"执行部署前置命令","display_name":"执行部署前置命令","skipped":false},{"name":"部署应用","display_name":"部署应用","skipped":false},{"name":"检测部署结果","display_name":"检测部署结果","skipped":false}],"display_blocks":{"access_info":{"address":"http://apps.ce.bktencent.com/stag--python-study/","type":"subpath"},"release_help_docs":[{"title":"配置蓝鲸应用访问入口","location":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/app_entry_intro","short_description":"","link":"https://bk.tencent.com/docs/markdown/PaaS3.0/topics/paas/app_entry_intro","name":"配置蓝鲸应用访问入口","text":"配置蓝鲸应用访问入口","description":""}]}}]
      return resolve(data)
    });
  },

  /**
     * 获取部署中阶段详情
     * @param {Object} params 请求参数：appCode, moduleId, env, uuid
     */
  getBeingDeployDetail (params, { appCode, moduleId, env, uuid }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deploy_phases/${uuid}/`;
    return axios.get(url, config);
  },

  /**
     * 创建svn分支
     * @param {Object} params 请求参数：appCode, moduleId
     */
  createSvnBranch (params, { appCode, moduleId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/repo/tags/`;
    return axios.post(url, {}, config);
  },

  /**
     * 获取部署后各阶段详情
     * @param {Object} params 请求参数：appCode, moduleId, env, deployId
     */
  getDeployTimeline (params, { appCode, moduleId, env, deployId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/deploy_phases/${deployId}/`;
    return axios.get(url, config);
  },

  /**
     * 获取部署后日志
     * @param {Object} params 请求参数：appCode, moduleId, env, deployId
     */
  getDeployLog (params, { appCode, moduleId, deployId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deployments/${deployId}/result/`;
    return axios.get(url, config);
  },

  /**
     * 获取应用文档列表
     * @param {Object} params 请求参数：appCode, moduleId, env, deployId
     */
  getAppDocLinks (_params, { appCode }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/accessories/advised_documentary_links/`;
    return axios.get(url, config);
  },

  /**
     * 获取架构信息
     * @param {Object} params 请求参数：appCode, moduleName, smart_revision
     */
  getSchemaInfo (params, { appCode, moduleName, versionType, versionName }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleName}/repo/revisions/${versionType}:${versionName}`;
    return axios.get(url, config);
  },

  /**
     * 停止部署
     *
     * @param {Object} params 请求参数：appCode, moduleId, deployId
     */
  stopDeploy (params, { appCode, moduleId, deployId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deployments/${deployId}/interruptions/`;
    return axios.post(url, {}, config);
  },

  /**
     * 获取当前模块的部署配置信息
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  getDeployConfig (params, { appCode, moduleId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deploy_config/`;
    return axios.get(url, {}, config);
  },

  /**
     * 更新当前模块的部署配置信息
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  updateDeployConfig (_params, { appCode, moduleId, params }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deploy_config/hooks/`;
    return axios.post(url, params, config);
  },

  /**
     * 禁用当前模块的部署配置信息
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  closeDeployConfig (params, { appCode, moduleId, type }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/deploy_config/hooks/${type}/disable/`;
    return axios.put(url, {}, config);
  },

  /**
     * 获取指定模块所有环境的增强服务使用信息
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  getCloudAppResource (params, { appCode, moduleId }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/services/info/`;
    return axios.get(url, config);
  },

  /**
     * 获取云原生模块信息
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  getCloudAppYaml (params, { appCode }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/mres/`;
    return axios.get(url, config);
  },

  /**
     * 提交发送云原生模块信息
     *
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  sumbitCloudApp (_params, { appCode, moduleId, env, params }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/modules/${moduleId}/envs/${env}/mres/deployments/`;
    return axios.post(url, params, config);
  },

  /**
     * 获取二次确认信息
     *
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getCloudAppInfo (_params, { appCode, moduleId, env, params }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/modules/${moduleId}/envs/${env}/mres/deploy_preps/`;
    return axios.post(url, params, config);
  },

  /**
     * 查看应用模型资源当前状态
     *
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getCloudAppStatus (params, { appCode, moduleId, env }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/modules/${moduleId}/envs/${env}/mres/status/`;
    return axios.get(url, config);
  },

  /**
     * 查看应用模型状态YAML
     *
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getCloudAppDeployYaml (params, { appCode, moduleId, env, deployId }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/modules/${moduleId}/envs/${env}/mres/deployments/${deployId}/`;
    return axios.get(url, config);
  },
  /**
     * 获取应用模型部署记录
     * @param {Object} params 请求参数：appCode, moduleId, env
     */
  getCloudAppDeployHistory (params, { appCode, moduleId, env }, config = {}) {
    const url = `/svc_workloads/api/cnative/specs/applications/${appCode}/modules/${moduleId}/envs/${env}/mres/deployments/`;
    return axios.get(url, config);
  },
  /**
     * 获取云原生应用ext
     *
     * @param {Object} params 请求参数：appCode, moduleId
     */
  getManifestExt (params, { appCode, moduleId, env }, config = {}) {
    const url = `/api/bkapps/applications/${appCode}/modules/${moduleId}/envs/${env}/manifest_ext/`;
    return axios.get(url, config);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
