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