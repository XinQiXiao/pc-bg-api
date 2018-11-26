import { isDev } from '../global'

const prdConfig = {
	isDev,
	port: process.env.NODE_PORT || 8094,
}

export default prdConfig