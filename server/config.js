
import { isDev } from '../global'
import debug from './debug'
import configDev from './config.dev'
import configPrd from './config.prod'

// const
// const { info } = debug('config')

const config = isDev ? configDev : configPrd

// info('config=>', config)

module.exports = config