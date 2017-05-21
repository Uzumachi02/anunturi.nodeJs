import helper from './_helperController'
import AnuntRepository from '../repositories/AnuntRepository'
import ImageRepository from '../repositories/ImageRepository'
import * as Joi from 'joi'

export default {
  add,
  edit,
  remove,
  getAnuntById,
  getAnunForHorzBlock,
  getAnunturile,
  addview,
  toggleStatus,
  forEdit
}

async function add (req, res) {
  try {
    if( !req.session.authUser )
      throw 'Necesită logare'

    let schema = {
      catAnunt: Joi.any().only([1, 2, 3]).required().label('Categoria anuntului'),
      tipAnunt: Joi.any().only([1, 2]).required().label('Tipul anuntului'),
      title: Joi.string().required().label('Denumirea'),
      describe: Joi.string().required().label('Descrierea'),
      price: Joi.number().positive().required().label('Pretu'),
      images: Joi.array().items(Joi.string().uri()).label('Imaginile anuntului'),
      location: Joi.string().required().label('Localitatea')
    }

    let data = req.body
    let validAnunt = await helper.loadSchema(data, schema)
    let insert = {
      user_id: req.session.authUser.id,
      cat_id: validAnunt.catAnunt,
      tip_id: validAnunt.tipAnunt,
      titlu: validAnunt.title,
      describe: validAnunt.describe,
      location: validAnunt.location,
      price: validAnunt.price,
      add_dt: 'NOW()'
    }

    let ress = await AnuntRepository.add(insert)
    await ImageRepository.add(ress.rows[0].id, validAnunt.images)

    return helper.sendData({ id: ress.rows[0].id }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function edit (req, res) {
  try {
    if( !req.session.authUser )
      throw 'Necesită logare'

    let schema = {
      id: Joi.number().integer().positive().required().label('Id'),
      cat_id: Joi.any().only([1, 2, 3]).required().label('Categoria anuntului'),
      tip_id: Joi.any().only([1, 2]).required().label('Tipul anuntului'),
      titlu: Joi.string().required().label('Denumirea'),
      describe: Joi.string().required().label('Descrierea'),
      price: Joi.number().positive().required().label('Pretu'),
      images: Joi.array().items(Joi.string().uri()).label('Imaginile anuntului'),
      location: Joi.string().required().label('Localitatea')
    }

    let data = req.body
    let validAnunt = await helper.loadSchema(data, schema)
    const id = validAnunt.id
    let update = {
      cat_id: validAnunt.cat_id,
      tip_id: validAnunt.tip_id,
      titlu: validAnunt.titlu,
      describe: validAnunt.describe,
      location: validAnunt.location,
      price: validAnunt.price
    }
    let where = [['id', id], ['user_id', req.session.authUser.id]]

    let ress = await AnuntRepository.edit(update, where)
    if( ress.rowCount < 1 )
      throw 'Nu aveți acces'

    if( req.body.isEditImg )
      await ImageRepository.add(id, validAnunt.images)

    return helper.sendData({ id }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getAnuntById (req, res) {
  try {
    let id = parseInt(req.params.id)

    if( id < 1 )
      throw 'id not positiv'

    let anunt = await AnuntRepository.getAnuntById(id)
    if( anunt.rowCount < 1 )
      throw 'anunt not found'

    let anuntImage = await ImageRepository.getAnuntImages(id)

    let item = anunt.rows[0]
    item.images = anuntImage.rows

    return helper.sendData({ item }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function remove (req, res) {
  try {
    if( !req.session.authUser )
      throw 'Necesită logare'

    let id = parseInt(req.params.id)
    let ress = await AnuntRepository.remove([id, req.session.authUser.id])
    if( ress.rowCount < 1 )
      throw 'Nu aveți acces'

    await ImageRepository.removeAll(id)

    return helper.sendData({ item: ress.rows }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getAnunForHorzBlock (req, res) {
  try {
    const queries = req.query

    const limit = queries.limit ? parseInt(queries.limit) : 0
    const type = queries.type || 'last'

    let values = []
    let aftSql = ''
    if( type === 'category' && queries.cat_id > 0 ) {
      aftSql = 'AND an.cat_id = $1 ORDER BY an.id DESC'
      values.push(queries.cat_id)
    } else if ( type === 'user' && queries.user_id > 0 ) {
      aftSql = 'AND an.user_id = $1 ORDER BY an.id DESC'
      values.push(queries.user_id)
    } else {
      aftSql = type === 'vip' ? 'ORDER BY an.view DESC' : 'ORDER BY an.id DESC'
    }

    let items = await AnuntRepository.getForHorzBlock(aftSql, values)
    return helper.sendData({ items: items.rows }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getAnunturile (req, res) {
  try {
    const queries = req.query
    let aftSql = ''
    if( queries.category )
      aftSql += ' AND an.cat_id = ' + queries.category

    if( queries.type )
      aftSql += ' AND an.tip_id = ' + queries.type

    if( queries.price_from )
      aftSql += ' AND an.price >= ' + queries.price_from

    if( queries.price_to )
      aftSql += ' AND an.price <= ' + queries.price_to

    const order = ['id DESC', 'price DESC', 'view DESC', 'id ASC', 'price ASC', 'view ASC']
    aftSql += ` ORDER BY an.${order[queries.sorting || 0]}`
    let ress = await AnuntRepository.getForHorzBlock(aftSql)

    let items = ress.rows
    return helper.sendData({ items }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function addview (req, res) {
  try {
    let id = parseInt(req.params.id)

    let ress = await AnuntRepository.incrementView(id)

    return helper.sendData({ item: ress.rows[0] }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function toggleStatus (req, res) {
  try {
    const id = parseInt(req.params.id)
    const status = parseInt(req.query.status)

    if( !req.session.authUser )
      throw 'Necesită logare'

    let ress = await AnuntRepository.toggleStatus([id, status, req.session.authUser.id])
    if( ress.rowCount < 1 )
      throw 'Nu aveți acces'

    return helper.sendData({ item: ress.rows[0] }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function forEdit (req, res) {
  try {
    let id = parseInt(req.params.id)

    if( !req.session.authUser )
      throw 'Necesită logare'

    let ress = await AnuntRepository.forEdit([id, req.session.authUser.id])
    if( ress.rowCount < 1 )
      throw 'Nu aveți acces'

    let anunt = ress.rows[0]

    let images = await ImageRepository.getAnuntImages(id)
    anunt.images = images.rows.map(item => item.url)
    return helper.sendData({ item: anunt }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}
