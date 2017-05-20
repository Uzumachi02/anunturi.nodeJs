import db from '../database'
import helper from './_helperRepository'

const table = 'tip_anunt'

export default {
  getAll
}

function getAll () {
  return db.query(`SELECT * FROM ${table} ORDER by id`)
}
