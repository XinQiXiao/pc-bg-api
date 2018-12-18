/**
 * create at 12/17/18
 */
import { routesMiddle } from '../core/middleware'
import * as Controllers from '../controllers'

const api = routesMiddle({prefix: 'pc_api', Controllers})

function routerFun(app){
  app.use('/', api)
}

export default routerFun