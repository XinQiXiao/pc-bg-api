/**
 * create at 12/17/18
 */
import express from 'express'
import _ from 'lodash'
import { result } from '../../../utils'

const { info, error, } = require('../../debug')('routesMiddle')
const { resultUnauthroized, resultError, INTERNAL_SERVER_ERROR,} = result

async function _callRequestHandler({Controller, attrs, handler, req, res, next}){

	const { anonymous = false, json = false } = {...Controller, ...attrs}
	const { loginUser } = req.inputs

	if(!anonymous && !req.authorized){
		if(req.isWechat){
			const url = req.generateUrl('/auth/wechat/oauth', {returnUrl: req.headers.referer})
			req.redirect(url)
		} else {
			res.json(resultUnauthroized({data: null}))
		}

		return
	}

	const handlerName = handler && handler.name || 'Unknown Handler'
	info(' _callRequestHandler handlerName =>', handlerName)
	try{
		if(!json)
			return await handler(req.inputs, {params: req.params, loginUser, req, res, next})

		info('==================== Inputs Data ====================')
		info(JSON.stringify(req.inputs, null, 2))
		info('==================== Inputs Data End ====================')
		// 起始时间
		const start = Date.now()
		const ret = await handler(req.inputs, {params: req.params, loginUser, req, res, next})

		if(_.isNil(ret))
			throw new Error('routes middle ret is nil')

		ret.time = `${Date.now() - start}ms`
		info('==================== Response Data ====================')
		info(JSON.stringify(ret, null, 2))
		info('==================== Response Data End====================')
		res.json(ret)
	} catch(err){
		error(`Handler=>${handlerName} msg=>${err.message}`)
		const ret = resultError({code: INTERNAL_SERVER_ERROR, err: err.message})
		info('==================== Response Data ====================')
		info(JSON.stringify(ret, null, 2))
		info('==================== Response Data End====================')
		res.json(ret)
	}
}

function routes({prefix, Controllers}){
	const router = express.Router()

	const createRoutePath = (p, controllerPath) => {
		const path = _.startsWith(controllerPath, '/') ? controllerPath 
			: controllerPath ? `${prefix}/${controllerPath}` : `${prefix}`
		return _.startsWith(p, '/') ? p : `/${path}/${p}`
	}

	_.forIn(Controllers, (Controller)=>{
		
		const {path: controllerPath} = Controller
		const instance = new (Controller.__esModule ? Controller.default : Controller)()

		if(controllerPath){
			const routePath = createRoutePath(`${controllerPath}/:method`)

			router.all(routePath, function(req, res, next){
				const {method} = req.params
				const handler = instance[method].bind(instance)
				const attrs = instance.attrs && instance.attrs[method]
				
				_callRequestHandler({Controller, attrs, handler, req, res, next})
			})
		}
		
	})

	return router
}

export default routes