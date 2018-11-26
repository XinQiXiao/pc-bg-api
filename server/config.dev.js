
import { isDev } from '../global'

const devConfig = {
	isDev,
	port: process.env.NODE_PORT || 8094,
}

export default devConfig