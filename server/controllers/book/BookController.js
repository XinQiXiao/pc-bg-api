/**
 * create at 12/17/18
 */
import _ from 'lodash'
import BaseController from '../BaseController'
import {db} from '../../service'
import { route, anonymous, json } from '../../core/decorators'
import { result } from '../../../utils'

// const { info, error } = require('../../debug')('bookController')
const { resultOK } = result

@json(true)
@anonymous(true)
@route('pc/book')
class BookController extends BaseController {
	constructor(){
		const options = {
			model: 'book_category'
		}

		super(options)
	}

	@anonymous
	async getBookCategorys(inputs){
		const result = await db.book_category.findAll({
			attributes: [
				'category_id',
				'category',
				'parent_id'
			],
			raw: true
		})

		return resultOK({data: result})
	}

}

export default BookController