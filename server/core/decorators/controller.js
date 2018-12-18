/**
 * create at 12/18/18
 */
import _ from 'lodash'

const {info} = require('../../debug')('decorator')

function decorateMethod(props, value, target, name, descriptor){
	_.set(target, ['attrs', name, props], value)
	return descriptor
}

function decorate(props, defaultValue, target, ...restArgs){
	if(_.isObject(target)){
		if(restArgs.length === 3){
			return decorateMethod(props, defaultValue, ...restArgs)
		} else {
			// class
			target[props] = defaultValue
		}
	} else {
		const value =  target 
		
		return (...args)=> {
			if(args.length === 3){
				return decorateMethod(props, value, ...args)
			} else {
				args[0][props] = value // args[0] is target
			}
		}
	}
}


// controller 不用登录
function anonymous(value = true){
	return decorate('anonymous', value, ...arguments)
}

// 非 json
function jsonController(value = true){
	return decorate('json', value, ...arguments)
}

// controller path
function pathController(value = ''){
	return decorate('path', value, ...arguments)
}

export {
	pathController as route,
	anonymous,
	jsonController as json,
}