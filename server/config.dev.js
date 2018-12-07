
import { isDev } from '../global'

const devConfig = {
	isDev,
	port: process.env.NODE_PORT || 8095,
	allow: ['http://localhost:9000','http://localhost:9002','http://127.0.0.1:9000','http://127.0.0.1:9002','http://localhost:9099'],
}

export default devConfig