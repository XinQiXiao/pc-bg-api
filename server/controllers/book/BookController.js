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

	// 获取所有图书类别
	async getBookCategorys(inputs){
		const result = await db.book_category.findAll({
			attributes: [
				['category_id', 'id'],
				'category',
				'parent_id'
			],
			where: {
				status: {
					[Op.ne]: 0,
				}
			},
			raw: true
		})

		return resultOK({data: result})
	}
	// 获取子类别图书类别
	async getBookChildrenCategorys(){
		const result = await db.book_category.findAll({
			attributes: [
				['category_id', 'id'],
				'category',
			],
			where: {
				status: {
					[Op.ne]: 0,
				},
				parent_id: {
					[Op.ne]: 0,
				}
			},
			raw: true
		})

		return resultOK({data: result})
	}

	// 获取所有图书信息
	async getAllBookInfo(inputs){
		const ret = await db.book_info.findAll({
			attributes: [
				'book_name',
				'author',
				['book_id', 'id'],
				'price',
				'press',
				'pubdate',
				'store',
			],
			where: {
				status: {
					[Op.ne]: 0,
				}
			},
			include: [
				{
					model: db.book_category,
					attributes: [
						'category_id',
						'category',
					],
					as: 'book_category',
					required: false,
				}
			],
			raw: false
		})

		return resultOK({data: ret})
	}

	async addBook(inputs){
		const {book_name, author, book_category_id, price, press, pubdate, store} = inputs
		const ret = await db.book_info.create({
			book_name,
			author,
			book_category_id,
			price,
			press,
			pubdate,
			store,
			status: 1,
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