
import { isDev } from '../global'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

// const
const SEC = 1e3 // 1000ms

const devConfig = {
	isDev,
	port: process.env.NODE_PORT || 8095,
	allow: ['http://localhost:3000','http://127.0.0.1:3000'],

	// database
	book: {
		dialect: 'mysql',
		benchmark: true,
		pool: {
			acquire: 3 * SEC,
			evict: 10.1 * SEC,
			idle: 30 * SEC,
			max: 1,
			min: 0,
		},
		host: '127.0.0.1',
		database: 'book',
		user: 'root',
		password: 'Start2015',
		operatorsAliases: Op,
	},

	auth: {
		dialect: 'mysql',
		benchmark: true,
		pool: {
			acquire: 3 * SEC,
			evict: 10.1 * SEC,
			idle: 30 * SEC,
			max: 1,
			min: 0,
		},
		host: '127.0.0.1',
		database: 'admin_auth',
		user: 'root',
		password: 'Start2015',
		operatorsAliases: Op,
	}
}

export default devConfig