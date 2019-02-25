/**
 * create at 12/18/18
 */
import _ from 'lodash'

const OK = 0 

const BAD_REQUEST = 400
const UNAUTHORIZED = 401 // 未认证
const NOT_FOUND = 404 // 请求未找到
const METHOD_NOT_ALLOWED = 405 // 请求无权限

// 用户认证相关
const AUTH_USER_NOT_FOUND = 410 // 用户未找到
const AUTH_PASSWORD_MISSMATCH = 411 // 用户名密码不匹配
const AUTH_USER_ALREADY_EXIST = 412  // 用户已经存在
const AUTH_USER_DISABLED = 413 // 用户禁用

// 客户端输入相关
const CLIENT_ERROR = 450
const CLIENT_VALIDATE_ERROR = 451
const CLIENT_BAD_INPUTS = 452

// 内部服务器错误
const INTERNAL_SERVER_ERROR = 500

const result = ({code, data, message})=>{
	const ret = {code}

	if(data)
		ret.data = data 

	if(message)
		ret.message = message 

	return ret
}

const resultOK = ({data})=>{
	return result({code: OK, data})
}

const resultError = ({code, err})=>{
	if(_.isString(err))
		return result({code, data: null, message: err})
	
	if(!!err)
		return result({code, data: err || null, message: err.message || ''})

	return result({code, data: null, message: ''})
}

const resultUnauthroized = ( {data} = {data: null} )=>{
	return result({code: UNAUTHORIZED, data, message: 'Unauthroized'})
}

export {
	INTERNAL_SERVER_ERROR,
	AUTH_USER_ALREADY_EXIST,
	resultOK,
	resultError,
	resultUnauthroized,
}