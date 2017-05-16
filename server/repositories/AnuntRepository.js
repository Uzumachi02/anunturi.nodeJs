import db from '../database'
import helper from './_helperRepository'

const table = 'anunturi'

export default {
  add
}

function add(values) {
  const requireFields = ['user_id', 'cat_id', 'tip_id', 'titlu', 'describe', 'price', 'add_dt']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}
