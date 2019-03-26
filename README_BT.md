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

		t0.1.4 bookInfo 增、“删”、改
			1. 给 book_info、book_category 增加status 状态
			2. 修改 book_info book_id 为自增
			3. 解决浏览器跨域问题，debugPrepare再设置
			4. book_info 创建 create
				a.获取所有子类别 parent_id != 0
				b. book_id 倒序
			5. book_info 修改 update
			6. book_info 删除 
				a.删除 数据 destroy （真删）
				b.book_info 表增加上架时间 和下家时间 create_time destroy_time
					重新生成 book_info model
					addBook 更新
				c. 删除 update status （假删）
			7. 翻页
				book_info 表，获取列表接口支持分页

				资料：https://www.jianshu.com/p/530b98489f9a 关于web 翻页功能截图补充

		t0.1.5 bookCategory 增、“删”、改/ sequelize 事务
			1.增加类别
				a.获取图书类别接口 兼容获取父类别和子类别
				b. book_category 表 增加create_time, modify_time, destroy_time
				c. 修改 book_info 表 status 信息
					修改完的 status 0~9 book 内部信息(未上架) 9 书自身下架
												 30 上架
												 10~29 其他原因导致未上架
					I.先更新已有信息 1 -> 30 0-> 9

			2. 类别上架/下架 （暂时不允许父类别，上架/下架）
				
			3. 上架/下架子类别，先下架是子类别的图书(支持事务)
				a. book_info 表增加 update_time 字段 修改对应接口(下架用 destroy_time 上架和修改用 update_time)
				修改图书信息 接口增加 update_time 修改时间
			4. TODO sequelize事务 transaction需要现在 book pool 开启至少两个链接，查找原因

		t0.1.6 后台 -- 员工管理
			1.导入 auth user model/ authCity model
			2.创建 userController
				获取员工列表接口
				创建员工接口
					登录名不重复检验
				编辑员工接口
			
		t0.1.6.1 
			morgan 漏洞升级
			说明 url:https://nvd.nist.gov/vuln/detail/CVE-2019-5413