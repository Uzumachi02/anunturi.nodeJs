import db from '../database'
import helper from './_helperRepository'

const table = 'users'

export default {
  add,
  edit,
  getUser,
  getUserData,
  updateOnline
}

function add(values) {
  const requireFields = ['login', 'password', 'email', 'reg_dt']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}

function edit (values, where) {
  let update = helper.getUpdateQuery(table, values, where)
  return db.query(update.sql, update.values)
}

function getUser (values) {
  const sql = `SELECT us.*,( SELECT number FROM user_phone AS usp WHERE usp.user_id = us.id) AS phone FROM ${table} AS us WHERE us.login = $1 AND us.password = $2`
  return db.query(sql, values)
}

function getUserData (id) {
  const sql = `SELECT "id", group_id, "login", email, f_name, l_name, p_name, online_dt, reg_dt FROM ${table} WHERE "id" = $1`
  return db.query(sql, [id])
}

function updateOnline (id) {
  return db.query(`UPDATE ${table} SET online_dt = NOW() WHERE id = $1`, [id])
}
