export default {
  getInsertQuery,
  getUpdateQuery
}

function getInsertQuery (table, requireFields, dates) {
  let values = []
  let valuesBind = ''
  requireFields.forEach((par, index) => {
    valuesBind += '$' + (index + 1) + ', '
    if( typeof dates[par] !== 'undefined' )
      values.push(dates[par])
    else values.push('')
  })

  let sql = 'INSERT INTO ' + table + ' (' + requireFields.join(', ') + ') VALUES (' + valuesBind.slice(0, -2) + ') RETURNING "id"'
  return { sql, values }
}

function getUpdateQuery (table, params, where) {
  let fields = Object.keys(params)
  let aftSql = ''
  let values = []
  let nbPr = 1
  fields.forEach(val => {
    aftSql += `${val} = $${nbPr++}, `
    values.push(params[val] || '')
  })

  let whereSql = []
  where.forEach(val => {
    whereSql.push(`${val[0]} = $${nbPr++}`)
    values.push(val[1])
  })

  let sql = `UPDATE ${table} SET ${aftSql.slice(0, -2)} WHERE ${whereSql.join(' AND ')} RETURNING id`
  return { sql, values }
}
