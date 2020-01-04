
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
* 注册操作
*
* @param {object} ctx
*/
const signIn = async ctx => {
  let result = {
    success: false,
    message: '注册失败'
  }

  const { username, password } = ctx.request.body;

  if (!username || !password) {
    result.message = '请输入用户名和密码';
    ctx.body = result;
  } else {
    let user = await User.findOne({username});
    if (!user) {
      const uModel = new User({ username, password });
      const doc = await uModel.save();
      if (!doc.errors) {
        const userToken = {
          username,
          password
        }

        const token = jwt.sign(userToken, config.secretSign, {expiresIn: '1h'})
        ctx.body = {
          success: true,
          message: '注册成功',
          token
        }
      } else {
        ctx.body = result;
      }
    } else {
      ctx.body = {
        success: false,
        message: '用户名已存在'
      }
    }
  }
};

/**
 * 登录操作
 * @param {object} ctx
 */
const login = async ctx => {
  let result = {
    success: false,
    message: '登录失败'
  }
  const { username, password } = ctx.request.body;
  await User.findOne({username}, (err, user) => {
    if (err) {
      throw err
    }

    if (!user) {
      ctx.body = {
        success: false,
        message: '用户不存在'
      }
    } else {
      if (password == user.password) {
        const userToken = {
          username,
          password
        }

        const token = jwt.sign(userToken, config.secretSign, {expiresIn: '1h'})
        ctx.body = { success: true, message: '登录成功', token}
      } else {
        ctx.body = { success: false, message: '密码错误'}
      }
    }
  })
};

/**
 * 获取用户信息
 * @param {object} ctx
 */
const getUserInfo = async ctx => {
	let session = ctx.session;
	let isLogin = session.isLogin;
	let userName = session.userName;

	let result = {
		success: false,
		message: '',
		data: null
	}

	// 用户判断

	ctx.body = result;
};


module.exports = { login, signIn, getUserInfo }