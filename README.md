# 
	基于 node exprss 写的 server api 项目

# project
	pc-bg-api
	A project of api for pc-bg-app

# branch && tag
* [各版本说明文档](README_BT.md)


# Start
	1.git clone https://github.com/XinQiXiao/pc-bg-api.git
	2.npm install or yarn install

# run
	1.npm start 
	2. In chrome type localhost:3000

# 生成model
安装 sequelize-auto url: https://www.npmjs.com/package/sequelize-auto

```bash
	npm install -g sequelize-auto
	npm install -g mysql
	./sql/create_models.sh
```

# 待解决
* reload 热加载不能起作用 (详见t0.0.4)
* express 中 static 功能需要研究 (详见t0.0.5 step e)
* sequelize事务 transaction 项目中需要至少两个链接的bug (详见	t0.1.5 step 4)

# 参考
* node js url: https://nodejs.org/en/
* express js url: https://expressjs.com
* mysql url: https://www.mysql.com
* sequelize 官网: http://docs.sequelizejs.com
* sequelize 中文参考文档: https://github.com/demopark/sequelize-docs-Zh-CN
* reload github 地址: https://github.com/alallier/reload#readme


# 版本 说明

- (README_BT.md)

# License

**MIT**