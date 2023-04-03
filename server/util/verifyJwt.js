const jwt = require('jsonwebtoken');
const config = require('../config');
const getJWTPayload = (token) => {
	// 验证并解析JWT
  return jwt.verify(token, config.secretSign);
}

// export default { getJWTPayload }
module.exports = { getJWTPayload }