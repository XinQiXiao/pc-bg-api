/**
 * create 12/14/18
 */
const {info} = require('../../debug')('authService')

class AuthService {
	constructor(db){
		info('db=>', db)

		this.db = db
	}

	logAccess(log){
		return this.db.accessLog.create(log)
	}

	logLogin(log){
		return this.db.loginLog.create(log)
	}
}

export default AuthService