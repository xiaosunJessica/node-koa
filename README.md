# node + koa + mongodb + vue学习

## 学习点
---

功能点|技术点|其它
---|:---:|---:
登录 、退出、注册|vue、vuex、vue router、element UI|前端打包、测试、ssr、单点登录
增、删、改、查|node、koa、jwt、router、mongodb(robomongo)|后端预览、postman、mocha单元测试
## 学习问题
  ---
  1. 打包 client -> server

      client 添加vue.config.js 里面配置outputDir

  2. 页面渲染和接口请求问题(暂未解决，输入localhost:8080/login依然有问题)
      ```
      .use(views(__dirname + '/views', {
        extension: 'ejs'
      }))
      ```
        以上方式会出现的问题是浏览器输入localhost:8080,此时不是浏览器渲染，而是接口请求，会进入中间件。其结果如下图所示

      ![avatar](./mdImages/render&api.png)
  
  3. 使用jwt，当authorization失效时的处理方式是采用中间件统一处理
  4. node 使用es6语法 import require（babel 相关插件添加）
  5. router.routes() 
  6. postman port  -> front port -> not backend port 
  7. postman 'content-type': 'application/x-www-form-urlencoded', post 		ctx.request.body才可以拿到数据 

		常用content-type | 使用场景|
		:---:             |:---: |
		multiple/form-data |发送file文件包，会附带boundary用于分割数据,如图片传输 |
		application/x-www-form-urlencoded |普通form表单提交，或js发包 |
		application/json|发送json格式数据 
  
  8. postman: get / post

## 待完成(2018.12.1)
   1. ~~注册功能~~
   <!-- 2. content-type, get/post等方式发送数据，后台获取参数的方式 -->
   3. [jwt 深入学习，以及401怎么返回比较合适](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
   4. [import require学习](http://imweb.io/topic/582293894067ce9726778be9)，[另一个链接](https://chenshenhai.github.io/koa2-note/note/other/esm.html)
	 写出require中间件的方法

		类型 | 导入 | 导出
		---: | ---: | ---:
		ES6 | import(编译) | export
		commonJS | require(运行) | module.exports
   5. node router学习
   6. 测试
		前端测试：
			a: 安装@vue/cli-plugin-unit-mocha、@vue/test-utils、chai
			b: eslint屏蔽mocha报错，在eslintConfig中的env添加mocha: true
			c: 测试默认文件是tests/unit下的*.spec.js
			
   7. ssr
   8. 单点登录

 
