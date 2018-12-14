/**
 * create 12/07/18
 *  参考 crypto 加解密
 * 		https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501504929883d11d84a1541c6907eefd792c0da51000
 */

import _ from 'lodash'
import crypto from 'crypto'

const { info } = require('../../debug')('tokenService')

const tokenKey = '9ijn8uhb'
const ALG_STR = 'aes-256-cbc'

class TokenService {
	encryptUser({userId, displayName, stamp}){
		const info = [userId, displayName, stamp]
		return this.encrypt(info)
	}

	decryptUser(encrypted){
		const info = this.decrypt(encrypted)

		if(!info || info.length != 3){
			return null
		}

		return {
			userId: info[0],
			displayName: info[1],
			stamp: info[2],
		}
	}

	encrypt = (toEncrypted)=>{
		return this._encrypt(ALG_STR, tokenKey, JSON.stringify(toEncrypted))
	}

	decrypt = (encrypted)=>{
		try{
			const ret = this._decrypt(ALG_STR, tokenKey, encrypted)
			return JSON.parse(ret)
		}catch(e){
			info('decrypt e=>', e)
			return null
		}
	}

	// 加密
	_encrypt = (algorithm, key, buf)=>{
		let encrypted = ''
		let cip = crypto.createCipher(algorithm, key)
		encrypted += cip.update(buf, 'utf8', 'hex')
		encrypted += cip.final('hex')
		return encrypted
	}

	// 解密
	_decrypt = (algorithm, key, encrypted)=>{
		let decrypted = ''
		let decip = crypto.createDecipher(algorithm, key)
		decrypted += decip.update(encrypted, 'hex', 'utf8')
		decrypted += decip.final('utf8')
		return decrypted
	}
}

export default TokenService