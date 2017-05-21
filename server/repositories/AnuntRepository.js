import db from '../database'
import helper from './_helperRepository'

const table = 'anunturi'

export default {
  add,
  edit,
  remove,
  getAnuntById,
  getForHorzBlock,
  incrementView,
  toggleStatus,
  forEdit
}

function add(values) {
  const requireFields = ['user_id', 'cat_id', 'tip_id', 'titlu', 'describe', 'location', 'price', 'add_dt']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}

function edit (values, where) {
  let update = helper.getUpdateQuery(table, values, where)
  return db.query(update.sql, update.values)
}

function getAnuntById (id) {
  const sql = `SELECT an.*, ( SELECT cat.name FROM cat_anunt AS cat WHERE cat.id = an.cat_id) AS category, ( SELECT typ.name FROM tip_anunt AS typ WHERE typ.id = an.tip_id) AS TYPE, us.login, us.f_name, us.l_name, us.email, ( SELECT ups.number FROM user_phone AS ups WHERE ups.user_id = an.user_id) AS phone FROM ${table} AS an LEFT JOIN users AS us ON us.id = an.user_id WHERE an.id = $1`
  return db.query(sql, [id])
}

function remove (values) {
  const sql = `DELETE FROM ${table} WHERE id = $1 AND user_id = $2 RETURNING id`
  return db.query(sql, values)
}

function getForHorzBlock (aftSql, vars, ignoreStatus) {
  let sql = `SELECT an. ID, an.titlu, an.price, an. VIEW, an.add_dt, an.status,( SELECT img.url FROM img_anunt AS img WHERE img.anunt_id = an. ID ORDER BY ID LIMIT 1) AS image FROM ${table} AS an WHERE `

  sql += ignoreStatus ? '1 = 1 ' : 'an.status = 1 '
  sql += aftSql

  return db.query(sql, vars)
}

function incrementView (id) {
  const sql = `UPDATE ${table} SET view = view + 1 WHERE id = $1 RETURNING view`
  return db.query(sql, [id])
}

function toggleStatus (values) {
  const sql = `UPDATE ${table} SET status = $2 WHERE id = $1 AND user_id = $3 RETURNING status`
  return db.query(sql, values)
}

function forEdit (values) {
  const sql = `SELECT * FROM ${table} WHERE id = $1 AND user_id = $2`
  return db.query(sql, values)
}
