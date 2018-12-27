/**
 * create at 12/07/18
 * 跨域问题
 *  参考：https://blog.csdn.net/yusirxiaer/article/details/79230891
 */
import _ from 'lodash'

const {info} = require('../../debug')('debugPrepare')

export default (allowOrigins)=> {
	return (req, res, next)=> {
		const origin = req.headers.origin || _.trimEnd(req.headers.referer, '/')

		info('req origin=>', origin)

		if(allowOrigins.indexOf(origin)>-1){
			// info('req 跨域=>')
			res.header('Access-Control-Allow-Origin', '*')
		}
		res.header('Access-Control-Allow-Credentials', true)
		res.header("Access-Control-Allow-Headers", "Accept-Encoding, Content-Type, User-Agent");
		res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")

		next()
	}
}