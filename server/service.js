/**
 * create at 12/07/18
 */

import { init } from './core/models'
import globalConfig from './config'
import { TokenService, AuthService } from './core/lib'

const db = init(globalConfig)

const tokenService = new TokenService()
const authService = new AuthService(db)

export {
	tokenService,
	authService,
	db,
}