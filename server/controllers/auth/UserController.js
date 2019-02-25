/**
 * create at 12/17/18
 */

import Sequelize from 'sequelize'
import moment from 'moment'
import _ from 'lodash'
import BaseController from '../BaseController'
import { route, anonymous, json } from '../../core/decorators'
import {db} from '../../service'
import { result } from '../../../utils'
import { md5Utils } from '../../utils'

// const
const { info, error } = require('../../debug')('userController')

const Op = Sequelize.Op
const { AUTH_USER_ALREADY_EXIST, resultOK, resultError, } = result
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
		// 检查登录名是否重复
		const retFind = await db.user.findOne({
			attributes: [
				'id',
			],
			where: {
				login_name: {
					[Op.eq]: login_name
				}
			}
		}) 

		if(!_.isNil(retFind) && !_.isNil(retFind.id) && retFind.id >0)
			return resultError({code: AUTH_USER_ALREADY_EXIST, err: '登录名不能重复'})
		
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
	async modifyEmployee(inputs){
		const {
			id, login_name, display_name, email, reset_password = false, password, mobile, status, city_id,
		} = inputs

		const passwordObj = {}

		if(reset_password){
			passwordObj.salt = getSalt()
			passwordObj.password_hashed = encryptHash(`${password}${passwordObj.salt}`)
		}

		const ret = await db.user.update({
			login_name,
			display_name,
			email,
			mobile,
			status,
			city_id,
			...passwordObj,
		}, {
			where: {
				id: {
					[Op.eq]: id
				}
			}
		})

		return resultOK({data: ret})
	}


}

export default UserController