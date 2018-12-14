/**
 * create at 12/14/18
 */
import Sequelize from 'sequelize'

const {info, warning} = require('../../debug')('model-sequelize')

const connections = {}
const models = {}

const poolStatsKeys = Object.freeze([
	'available', 'borrowed', 'pending', 'size', 'max', 'min', 'spareResourceCapacity'
])

const sqlLogFunc = ()=>{
	const [ sql, lapsed ] = arguments
	if(arguments.length < 3 || lapsed < 1e3)
		// eslint-disable-line no-console
		return console.log(sql)
	warning(`${sql} (${lapsed}ms)`)
}

function createDatabase(config, modelAlias = ''){
	const db = new Sequelize(
		config.database,
		config.user,
		config.password,
		Reflect.has(config, 'logging') ? config : { logging: sqlLogFunc, ...config }
	)

	// override default `softIdleTimeoutMillis` to make sure `idleTimeoutMillis` works
	// https://github.com/coopernurse/node-pool/issues/192
	db.connectionManager.pool._config.softIdleTimeoutMillis = Infinity

	// 打印数据库连接数情况
	const originalPoolFactoryDestroy = db.connectionManager.pool._factory.destroy
	db.connectionManager.pool._factory.destroy = (...args) => originalPoolFactoryDestroy(...args)
		.tap(() => info(poolStatsKeys.reduce(
			(msg, k) => msg += `${k}=${db.connectionManager.pool[k]}   `,
			`[pool:${modelAlias}] `
		)))

	return db
}

function connection(config, database){
	if(connections[database]){
		return 
	}

	info('connect ', database)

	let db = createDatabase(config[database], database)
	connections[database] = db 

	// 测试是否连接成功
	db.authenticate().then(()=>{
		info(`${database} connect successfully`)
	}).catch(err =>{
		info('Unable to connect to the database:',err)
	})
}

function init(config){
	connection(config, 'book')
}

export {
	init,
	connections,
	models,
}