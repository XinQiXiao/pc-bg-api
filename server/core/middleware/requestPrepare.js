/**
 * create at 12/06/18
 */
import _ from 'lodash'
import url from 'url'

import debug from '../../debug'

const { info } = debug('requestPrepare')

function requestPrepare(){
	return (req, res, next)=>{
		info(` method =>${req.method}`)
		info(` path =>${req.path}`)
		info(' headers =>', JSON.stringify(req.headers, null, 2))
		info(' cookies =>', JSON.stringify(req.cookies, null, 2))
		info(' query =>', JSON.stringify(req.query, null, 2))
		info(' params =>', JSON.stringify(req.params, null, 2))
		info(' body =>', JSON.stringify(req.body, null, 2))

		// TODO
		if(req.body && _.isString(req.body)){
			req.body = JSON.parse(req.body)
		}

		// TODO 
		req.inputs = {...req.body}

		req.isPost = ()=> req.method === 'POST'

		// TODO 
		req.fullUrl = req.protocal + '://' + req.get('host') + req.originalUrl

		req.generateUrl = (path, query)=> url.format({
			protocal: req.protocal,
			host: req.headers['x-forwarded-host'] || req.get('host'),
			pathname: path,
			query,
		})

		// info('req body =>', req.body, 'req inputs =>', req.inputs)
		// info('req fullUrl =>', req.fullUrl, 'req generateUrl =>', req.generateUrl)

		info('==================== Request Info End ====================')
		next()
	}
}

export default requestPrepare