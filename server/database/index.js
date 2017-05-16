const Pool = require('pg').Pool
const config = require('../config.json').db

export default new Pool(config)
