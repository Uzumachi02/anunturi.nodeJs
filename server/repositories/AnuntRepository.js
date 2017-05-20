import db from '../database'
import helper from './_helperRepository'

const table = 'anunturi'

export default {
  add,
  getAnuntById,
  getForHorzBlock,
  incrementView
}

function add(values) {
  const requireFields = ['user_id', 'cat_id', 'tip_id', 'titlu', 'describe', 'location', 'price', 'add_dt']
  let insert = helper.getInsertQuery(table, requireFields, values)
  return db.query(insert.sql, insert.values)
}

function getAnuntById (id) {
  const sql = `SELECT an.*,( SELECT cat. NAME FROM cat_anunt AS cat WHERE cat. ID = an.cat_id) AS category,( SELECT typ. NAME FROM tip_anunt AS typ WHERE typ. ID = an.tip_id) AS TYPE FROM ${table} AS an WHERE an. ID = $1`
  return db.query(sql, [id])
}

function getForHorzBlock (aftSql, vars) {
  const sql = `SELECT an. ID, an.titlu, an.price, an. VIEW, an.add_dt,( SELECT img.url FROM img_anunt AS img WHERE img.anunt_id = an. ID ORDER BY ID LIMIT 1) AS image FROM ${table} AS an WHERE an.status = 1 ${aftSql}`
  return db.query(sql, vars)
}

function incrementView (id) {
  const sql = `UPDATE ${table} SET view = view + 1 WHERE id = $1 RETURNING view`
  return db.query(sql, [id])
}
