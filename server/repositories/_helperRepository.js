export default {
  getInsertQuery
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
