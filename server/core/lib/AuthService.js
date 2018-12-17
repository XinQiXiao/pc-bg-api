/**
 * create 12/14/18
 */
const {info} = require('../../debug')('authService')

class AuthService {
	constructor(db){

		this.db = db
	}

	logAccess(log){
		return this.db.access_log.create(log)
	}
}

export default AuthService