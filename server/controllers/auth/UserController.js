/**
 * create at 12/17/18
 */

import Sequelize from 'sequelize'
import moment from 'moment'
import BaseController from '../BaseController'
import { route, anonymous, json } from '../../core/decorators'
import {db} from '../../service'
import { result } from '../../../utils'
import { md5Utils } from '../../utils'

// const
const { info, error } = require('../../debug')('userController')

const Op = Sequelize.Op
const { resultOK } = result
const { encryptHash, getSalt, } = md5Utils

@json(true)
@anonymous(true)
@route('pc/auth')
class UserController extends BaseController{

	// 获取员工列表
	async getEmployeesList(inputs){
		let ret = await db.user.findAll({
			attributes: [
				'id',
				'login_name',
				'email',
				'display_name',
				'mobile',
				'created_at',
				'status',
				'city_id',
			],
			order: [
				['id', 'DESC'],
			],
			where: {
				type: {
					[Op.eq]: 1
				}
			},
			raw: false, // true 可在获取后进行修改(例如对以上 ret[array 每个item添加属性])， false 不可，
		})

		return resultOK({data: ret})
	}

	// 增加员工
	async createEmployee(inputs){
		const {
			login_name, display_name, email, password, mobile, status, city_id,
			loginUser
		} = inputs
		// 生成 salt password_hashed
		const salt = getSalt()
		const password_hashed = encryptHash(`${password}${salt}`)
		// 取到 create_ip
		const create_ip = (loginUser && loginUser.clientIp) ? loginUser.clientIp : ''
		const ret = await db.user.create({
			login_name,
			email,
			display_name,
			password_hashed,
			salt,
			mobile,
			status,
			city_id,
			create_ip,
			created_at: moment.tz('Asia/Shanghai').valueOf(),
			type: 1
		})

		return resultOK({data: ret})
	}

	// 修改员工

}

export default UserController