/**
 * create at 12/10/18
 */
import { models, init as sequelizeInit, connections, } from './sequelize'

function init(config){
	sequelizeInit(config)

	const db = {...models, sequelize: {...connections}} 
	return db 
}

export {
	init,
}