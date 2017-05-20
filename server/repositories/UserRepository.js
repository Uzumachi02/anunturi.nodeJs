import db from '../database'
import helper from './_helperRepository'

const table = 'users'

export default {
  add,
  getUser
}

function add(values) {
  const requireFields = ['login', 'password', 'email', 'reg_dt']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}

function getUser (values) {
  const sql = `SELECT us.*,( SELECT number FROM user_phone AS usp WHERE usp.user_id = us.id) AS phone FROM ${table} AS us WHERE us.login = $1 AND us.password = $2`
  return db.query(sql, values)
}
