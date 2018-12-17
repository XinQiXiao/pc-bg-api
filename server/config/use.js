
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { argv } from 'yargs'

import router from './routes'
import debug from '../debug'
import { requestPrepare, debugPrepare, initLoginUser,} from '../core/middleware'
import { tokenService, authService, } from '../service'

import globalConfig from '../config'

// const
const { info, error, } = debug('request')

module.exports = function(app){
	app.use((req, res, next)=>{
		info('==================== Request Info ====================')
		info(`begin request ${req.path}`)
		next()
	})

	app.use(logger('dev'))

	app.use(bodyParser.json({strict: false}))
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(cookieParser())

	// TODO 
	app.use(express.static(path.join(__dirname, '../public/')))

	app.use(requestPrepare())

	if(argv.inline && argv.hot){
		app.all('*', debugPrepare(globalConfig.allow))
	}

	app.use(initLoginUser(authService, tokenService))

	// app.use('/', router)
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found!!')
		err.status = 404
		next(err)
	});
	
	// error handler
	// development error handler
	// will print stacktrace
	if(app.get('env') === 'development'){
		app.use(function(err, req, res, next){
			error('500 err=>', err)
			res.status(err.status || 500)
			res.send(err.message)
		})
	} else {
		app.use(function(err, req, res, next){
			res.status(err.status || 500)
			res.send(err.message)
		})
	}

}

// get 请求 示例
	// app.get('/process_get', function (req, res) {
	// 	// 输出 JSON 格式
	// 	var response = {
	// 			"first_name":req.query.first_name,
	// 			"last_name":req.query.last_name
	// 	}
	// 	console.log(response)
	// 	res.end(JSON.stringify(response))
 	// })
	// post 请求 示例
 	// app.post('/process_post', function (req, res) {
	// 	// 输出 JSON 格式
	// 	var response = {
	// 			"first_name":req.body.first_name,
	// 			"last_name":req.body.last_name
	// 	}
	// 	console.log(response)
	// 	res.end(JSON.stringify(response))
	// })