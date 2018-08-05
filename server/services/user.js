const userModel = require('../models/user');

const user = {
  /**
   * 创建用户
   * @param { Object } user用户信息
   * @return { Object } 创建结果
  */
  create: async user => {
    let result = await userModel.create(user)
    return result
  },
  /**
   * 登录业务操作
   * @param { Object } formData注册表单信息
   * @return { Object } 注册业务结果
  */
  signIn: async formData => {
    console.info(formData, 'services-------------')
    let resultData = await userModel.getUserByUsernameOrPassword({
      'password': formData.password,
      'username': formData.username
    })
    return resultData
  }
}

module.exports = user