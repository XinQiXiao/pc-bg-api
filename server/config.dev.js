
import { isDev } from '../global'

const devConfig = {
	isDev,
	port: process.env.NODE_PORT || 8095,
}

export default devConfig