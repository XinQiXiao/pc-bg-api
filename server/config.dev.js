
import { isDev } from '../global'

// const
const SEC = 1e3 // 1000ms

const devConfig = {
	isDev,
	port: process.env.NODE_PORT || 8095,
	allow: ['http://localhost:9000','http://localhost:9002','http://127.0.0.1:9000','http://127.0.0.1:9002','http://localhost:9099'],

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
	}
}

export default devConfig