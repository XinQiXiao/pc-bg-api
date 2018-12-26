# branch and target
		t0.0.1 按 am-tool-api 修改 bin 文件
			babel 配置
				安装
				babel-cli 
				babel-polyfill
				安装
				babel-preset-es2015
				babel-preset-react
				babel-preset-stage-0
				babel-plugin-transform-decorators-legacy
			配置 babelrc

		t0.0.2 debug
			debug util create

		t0.0.3 项目config 
			项目 config配置

		t0.0.4 bin 配置reload 热加载
			安装 reload
			TODO reload (功能有待调查)

			code  热加载 supervisor
			安装 supervisor

		t0.0.5 config/use
			a. request info
			b. morgan
				https://github.com/expressjs/morgan
				Predefined Formats for 'dev'
			c. body-parser
				https://github.com/expressjs/body-parser
			d. cookie-parser
			e. express.static TODO 需要研究
			f. requestPrepare diddlewares
			g. 补充 get / post 例子
			h. requestPrepare
			i. yargs 
				https://github.com/yargs/yargs
				http://www.cnblogs.com/bymax/p/5748662.html
			j. debugPrepare 浏览器跨域问题

		t0.0.6 use initLoginUser middleware
			a. server/service
				I. core lib
					TokenService (token信息加解密)（加密：userInfo => token, 解密: token => userInfo）
					Authservice

			b.sequelize
				I. core/models
					安装 sequelize / mysql2
						https://github.com/sequelize/sequelize
				II. core/models/sequelize
					connection
						createDatabase 
						测试是否连接成功

					生成model
					安装 sequelize-auto url: https://www.npmjs.com/package/sequelize-auto

					```bash
						npm install -g sequelize-auto
						npm install -g mysql
						./sql/create_models.sh
					```

					./sql 创建
					additional.json  
					create_models.sh

					创建第一个 sequelize modal

					导出 models

				c. authService db model 补全
					access_log
				
				d.initLoginUser

		t0.1.0 use routes
			I. middleware routes
				controllers bookController
				routesMiddle 

			II. 修饰器 core decorators
				route、json、anonymous

			III. /utils/result 

			IIII. 第一个接口 getBookCategorys
		
		t0.1.1
			兼容 浏览器请求跨域问题
			返回参数与浏览器返回参数统一

		t0.1.2 
			a. 解决 [sequelize deprecated String based operators are now deprecated. Please use 	Symbol based operators for better security, read more at] 问题
			http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
				sequelize 配置里添加 operatorsAliases 参数

		t0.1.3 第一个关联表 
			sequelize association
			query raw: if true,reformat the results.

		t0.1.4 bookInfo/bookCategory 增、“删”、改/ sequelize 事务
			1. 给 book_info、book_category 增加status 状态
			2. 修改 book_info book_id 为自增
			3. book_info 创建
				a.获取所有子类别 parent_id != 0
			TODO 真假删除