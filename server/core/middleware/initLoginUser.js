/**
 * create at 12/07/18
 */
import { TOKEN } from '../../../global'

const { info, warning, } = require('../../debug')('initLoginUser')

export default (authService, tokenService)=>{
	return (req, res, next)=>{
		const token = req.cookies[TOKEN] || req.inputs[TOKEN]

		req.clientIp = req.headers['X-Forwarded-For'] || req.connection.remoteAddress

		if(token){
			req.loginUser = tokenService.decryptUser(token) || {}
		} else {
			req.loginUser = {}
		}

		info(' loginUser => ', req.loginUser)

		req.authorized = req.loginUser && req.loginUser.userId
		req.loginUser.clientIp = req.clientIp 
		req.isWechat = !!req.headers['user-agent'].match(/MicroMessenger/i)

		const accessLog = {
			userId: req.loginUser ? (req.loginUser.userId || 0) : 0,
			requestUri: req.path,
			request: JSON.stringify(req.body),
			method: req.method,
			allowed: 1,
			clientIp: req.clientIp,
			headers: JSON.stringify(req.headers)
		}
		authService
		.logAccess(accessLog)
		.catch(err => warning(`Failed to save access log [${err && err.message}] -`, accessLog))

		req.inputs.loginUser = req.loginUser 
		
		if( !req.authorized )
			return next()
 
		next()
	}
}