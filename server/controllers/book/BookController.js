/**
 * create at 12/17/18
 */
import _ from 'lodash'
import BaseController from '../BaseController'
import {db} from '../../service'
import { route, anonymous, json } from '../../core/decorators'
import { result } from '../../../utils'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

// const { info, error } = require('../../debug')('bookController')
const { resultOK } = result

@json
@anonymous
@route('pc/book')
class BookController extends BaseController {
	constructor(){
		const options = {
			model: 'book_category'
		}

		super(options)
	}

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

	async getAllBookInfo(inputs){
		const ret = await db.book_info.findOne({
			attributes: [
				'book_name',
				'author',
				'book_id',
			],
			where: {
				book_id: 20150201
			},
			include: [
				{
					model: db.book_category,
					attributes: [
						'category_id',
						'category',
					],
					// as: 'bookCategory',
					required: false,
				}
			],
			raw: true
		})

		return resultOK({data: ret})
	}

	async getKKXteam(){
		const ret = await db.players.findAll({
			attributes: [
				'name',
				'id',
				'age',
				'interest',
				'team_id'
			],
			where: {
				team_id: 1,
				id: 1,
			},
			include: [
				{
					model: db.teams,
					attributes: [
						'name',
						'id',
						'people_num',
					],
					as: 'teams'
				}
			],
			raw: false
		})
		return resultOK({data: ret})
	}

}

export default BookController