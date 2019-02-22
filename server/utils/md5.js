/**
 * create at 02/22/19
 */
import crypto from 'crypto'

const SALT_STR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

// 获取密码 MD5 签名
function encryptHash(str){
	let md5hash = crypto.createHash('md5')
	md5hash.update(new Buffer(str, 'utf8'))
	return md5hash.digest('hex')
}

// 获取六位的salt
function getSalt(){
	return _getNSaltItem(SALT_STR, 6)
}
function _getNSaltItem(sourceStr, n){
	let targetStr = ''
	for(let i=0; i< n; i++){
		targetStr += _saltItem(sourceStr)
	}
	return targetStr
}
function _saltItem(sourceStr){
	const n = Math.floor(Math.random()*(sourceStr.length))
	const item = sourceStr[n]
	return item
}

export {
	encryptHash,
	getSalt,
}