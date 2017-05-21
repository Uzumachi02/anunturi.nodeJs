import db from '../database'
import helper from './_helperRepository'

const table = 'user_phone'

export default {
  add,
  getForUser
}

async function add(idUs, values) {
  try {
    await db.query(`DELETE FROM ${table} WHERE "user_id" = $1`, [idUs])

    let sql = `INSERT INTO ${table} ("user_id", "number") VALUES `

    values.forEach((val, index) => {
      sql += `($1, $${index + 2}), `
    })

    sql = sql.slice(0, -2)
    return db.query(sql, [idUs, ...values])
  } catch (err) {
    throw new Error(err.message)
  }
}

function getForUser (id) {
  const sql = `SELECT * FROM ${table} WHERE user_id = $1`
  return db.query(sql, [id])
}
