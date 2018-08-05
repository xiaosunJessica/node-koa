
/**
* 登录操作
*
* @param {object} ctx
*/
const login = async ctx => {
  console.info('--------login', ctx.request)
  let result = {
    success: false,
    message: '登录失败'
  }

  const { username, password } = ctx.request.body;

  console.info(username, password, '----------usename------password')
  
  if (!(username && password)) {
    result.message = '请输入用户名和密码';
    ctx.body = result;
  } else {

  }
};

/**
 * 注册操作
 * @param {object} ctx
 */
const signIn = async ctx => {
	
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

/**
 * 校验登录
 * @param {object} ctx
 */
const validateLogin = async ctx => {
	
}

module.exports = { login, signIn, getUserInfo }