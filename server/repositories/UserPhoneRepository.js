import db from '../database'
import helper from './_helperRepository'

const table = 'user_phone'

export default {
  add
}

function add(values) {
  const requireFields = ['user_id', 'number']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}
