
import router from './routes'

const myLogger = (req, res, next)=>{
	console.log('app middle LOGGED .')
  next()
}

const requestTime = (req, res, next)=>{
	req.requestTime = Date.now()
  next()
}

module.exports = function(app){
	app.use(myLogger)
	app.use(requestTime)

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