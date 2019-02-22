/**
 * create at 12/07/18
 */

import { init } from './core/models'
import globalConfig from './config'
import { TokenService, AuthService } from './core/lib'

const { info } = require('./debug')('server-service')

const db = init(globalConfig)

info('db=>', db)

const tokenService = new TokenService()
const authService = new AuthService(db)

export {
	tokenService,
	authService,
	db,
}