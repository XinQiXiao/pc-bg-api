
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import router from './routes'
import debug from '../debug'

// const
const { info } = debug('request')

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

	app.use('/', router)
	
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found!!');
		err.status = 404;
		next(err);
	});
	
	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
	
		// render the error page
		res.status(err.status || 500);
		res.send(err.message);
	});
}