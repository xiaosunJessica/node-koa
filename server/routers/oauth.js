const router = require('koa-router')();
const oauthController = require('../controllers/oauth');

router.get('/', oauthController.codeToAccessToken)

module.exports = router;