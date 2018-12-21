/**
 * create at 12/18/18
 */
import _ from 'lodash'

const OK = 0 

const UNAUTHORIZED = 401 // 未认证

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
	resultOK,
	resultError,
	resultUnauthroized,
}