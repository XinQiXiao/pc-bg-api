/**
 * create at 12/07/18
 */
import { TOKEN } from '../../../global'

const { info } = require('../../debug')('initLoginUser')

export default (authService, tokenService)=>{
	return (req, res, next)=>{
		authService()
		info('authService=>', authService()) 
		info('tokenService=>', tokenService()) 
		next()
	}
}