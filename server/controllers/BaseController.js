/**
 * create at 12/17/18
 */
import _ from 'lodash'
import { db } from '../service'

class BaseController {
	constructor(options){
		if(_.isString(options)){
			options = {
				model: options
			}
		}

		this.options = options
		this.model = db[options.model]
	}
}

export default BaseController