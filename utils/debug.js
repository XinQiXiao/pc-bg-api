import debug from 'debug'

function _debug(app, level, name){
	return debug(`${app}:${level}:${name}`)
}

function outDebug(app, name){
	return {
		error: _debug(app, 'error', name),
		warning: _debug(app, 'warning', name),
		info: _debug(app, 'info', name),
		log: _debug(app, 'log', name)
	}
}

export default outDebug