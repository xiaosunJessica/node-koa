// const mongoose = require('mongoose');
// const Schema = mongoose.Schema

// const UserSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//     require: true
//   },
//   password: {
//     type: String,
//     require: true
//   }
// });

// module.exports = mongoose.model('user', UserSchema)

const dbUtils = require('../util/db-util');

const user = {
  /**
   * 数据库创建用户
   * @param { Object } model 用户数据模型
   * @return { Object } mysql 执行结果
   */
  create: async model => {
    let result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param { Object } options 用户名密码对象
   * @return { Object | null } 查找结果
  */

  getUserByUsernameOrPassword: async options => {
    console.info('get------------models')
    let _sql = `SELECT * from user
    where password='${options.password}' and name='${options.username}'
    limit 1`
    let result = await dbUtils.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = user