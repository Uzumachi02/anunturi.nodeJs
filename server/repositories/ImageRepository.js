import db from '../database'
import helper from './_helperRepository'

const table = 'img_anunt'

export default {
  add,
  getAnuntImages,
  removeAll
}

async function add(idAnunt, values) {
  try {
    await db.query(`DELETE FROM ${table} WHERE "anunt_id" = $1`, [idAnunt])

    let sql = `INSERT INTO ${table} ("anunt_id", "url") VALUES `

    values.forEach((val, index) => {
      sql += `($1, $${index + 2}), `
    })

    sql = sql.slice(0, -2)
    return db.query(sql, [idAnunt, ...values])
  } catch (err) {
    throw new Error(err.message)
  }
}

function getAnuntImages (id) {
  const sql = `SELECT * FROM ${table} WHERE anunt_id = $1`
  return db.query(sql, [id])
}

function removeAll (id) {
  db.query(`DELETE FROM ${table} WHERE "anunt_id" = $1`, [id])
}
