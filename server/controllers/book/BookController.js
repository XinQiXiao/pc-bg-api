/**
 * create at 12/17/18
 */
import _ from 'lodash'
import Sequelize from 'sequelize'
import moment from 'moment'
import BaseController from '../BaseController'
import {db} from '../../service'
import { route, anonymous, json } from '../../core/decorators'
import { result } from '../../../utils'

const Op = Sequelize.Op

const { info, error } = require('../../debug')('bookController')
const { resultOK } = result

@json
@anonymous
@route('pc/book')
class BookController extends BaseController {

	// 获取图书类别
	async getBookCategorys(inputs){
		// type 0 全部    1 父类别    2子类别
		const {type = 0} = inputs
		let parentOptions = {}, statusOptions = {}
		if(type === 1){
			parentOptions = {
				parent_id: {
					[Op.eq]: 0,
				}
			}
			statusOptions = {
				status: {
					[Op.ne]: 0,
				}
			}
		}
		if(type === 2){
			parentOptions = {
				parent_id: {
					[Op.ne]: 0,
				}
			}
			statusOptions = {
				status: {
					[Op.ne]: 0,
				}
			}
		}
		const result = await db.book_category.findAll({
			attributes: [
				['category_id', 'id'],
				'category',
				'parent_id',
				'status',
				'create_time',
				'update_time',
				'destroy_time',
			],
			where: {
				...statusOptions,
				...parentOptions,
			},
			raw: true
		})

		if(type === 1){
			// 获取父类别增加 默认类别
			result.unshift({
				id: 0,
				category: '(自己是父类别)'
			})
		}

		return resultOK({data: result})
	}
	// 创建类别
	async addCategory(inputs){
		const {category, parent_id} = inputs
		const result = await db.book_category.create({
			category,
			parent_id,
			status: 1,
			create_time: moment.tz('Asia/Shanghai').valueOf(),
		})

		return resultOK({data: {category_id: result.category_id}})
	}
	// 类别上架
	async putAwayCategory(inputs){
		try{
			const {category_id} = inputs
			await db.sequelize.book.transaction(async t=>{
				// 1.更新 book_info 
				await db.book_info.update({
					status: 30,
					update_time: moment.tz('Asia/Shanghai').valueOf(),
				}, {
					where: {
						book_category_id: {
							[Op.eq]: category_id
						}
					}
				}, {transaction: t})
				await db.book_category.update({
					status: 1,
					update_time: moment.tz('Asia/Shanghai').valueOf(),
				}, {
					where: {
						category_id: {
							[Op.eq]: category_id
						}
					}
				}, {transaction: t})
			})
			
			return resultOK({data: '上架成功'})
		}catch(e){
			error(e)
			throw new Error(`图书类别上架操作失败`)
		}
	}
	// 类别下架
	async soldOutCategory(inputs){
		try{
			const {category_id} = inputs
			await db.sequelize.book.transaction(async t=>{
				// 1.更新 book_info
				await db.book_info.update({
					status: 19,
					destroy_time: moment.tz('Asia/Shanghai').valueOf(),
				}, {
					where: {
						book_category_id: {
							[Op.eq]: category_id
						}
					}
				}, {transaction: t})
				// 2.更新 book_category
				await db.book_category.update({
					status: 0,
					destroy_time: moment.tz('Asia/Shanghai').valueOf(),
				}, {
					where: {
						category_id: {
							[Op.eq]: category_id
						}
					}
				}, {transaction: t})
			})
			
			return resultOK({data: '下架成功'})
		}catch(e){
			error(e)
			throw new Error(`图书类别下架操作失败`)
		}
	}

	// 获取所有图书信息
	async getAllBookInfo(inputs){
		const { page: curPage } = inputs
		info('getAllBookInfo inputs=>', inputs)
		let {page_size = 10, page = 1,} = curPage
		let result = {}

		const statusOption = {
			status: {
				[Op.gte]: 30,
			}
		}

		const sumRet = await db.book_info.count({
			where: {
				...statusOption,
			}
		})

		const listRet = await db.book_info.findAll({
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
				...statusOption,
			},
			order:[
				['book_id', 'DESC'],
			],
			offset: (page-1)*page_size,
			limit: page_size,
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

		result.sum = sumRet 
		result.list = listRet

		return resultOK({data: result})
	}
	// 添加图书
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
			status: 30,
			create_time: moment.tz('Asia/Shanghai').valueOf(),
		})
		return resultOK({data: {book_id: ret.book_id}})
	}
	// 修改图书信息
	async modifyBookInfo(inputs){
		const {book_id, ...rest} = inputs
		const ret = await db.book_info.update({
			...rest,
			update_time: moment.tz('Asia/Shanghai').valueOf(),
		}, {
			where: {
				book_id: {
					[Op.eq]: book_id,
				}
			}
		})
		return resultOK({data: {count: ret.length}})
	}	
	// 删除图书信息
	async removeBookInfo(inputs){
		const {book_id} = inputs
		// 真删除
		// const ret = await db.book_info.destroy({
		// 	where: {
		// 		book_id: {
		// 			[Op.eq]: book_id,
		// 		}
		// 	}
		// })
		// return resultOK({data: {count: ret}})

		// 假删除
		const ret = await db.book_info.update({
			status: 9,
			destroy_time: moment.tz('Asia/Shanghai').valueOf(),
		}, {
			where: {
				book_id: {
					[Op.eq]: book_id,
				}
			}
		})
		return resultOK({data: {count: ret.length}})
	}

}

export default BookController