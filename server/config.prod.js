import { isDev } from '../global'

// const
const SEC = 1e3 // 1000ms

const prdConfig = {
	isDev,
	port: process.env.NODE_PORT || 8094,
	allow: [],

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
		password: 'Start2015'
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
		password: 'Start2015'
	}
}

export default prdConfig