import helper from './_helperController'
import AnuntRepository from '../repositories/AnuntRepository'
import ImageRepository from '../repositories/ImageRepository'
import * as Joi from 'joi'

export default {
  add,
  getAnuntById,
  getAnunForHorzBlock,
  getAnunturile,
  addview
}

async function add (req, res) {
  try {
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
    console.log(data)

    let validAnunt = await helper.loadSchema(data, schema)
    console.log(validAnunt)
    let insert = {
      user_id: 1,
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
    console.log(err)
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
    console.log(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getAnunForHorzBlock (req, res) {
  try {
    const queries = req.query
    console.log(req.session)

    const limit = queries.limit ? parseInt(queries.limit) : 0
    const type = queries.type || 'last'
    const category = queries.category || 0

    let items = []
    if( type !== 'category' ) {
      const order = type === 'vip' ? 'ORDER BY an.view DESC' : 'ORDER BY an.id DESC'
      items = await AnuntRepository.getForHorzBlock(order)
    } else {
      const where = 'AND an.cat_id = $1 ORDER BY an.id DESC'
      items = await AnuntRepository.getForHorzBlock(where, [ category ])
    }
    return helper.sendData({ items: items.rows }, res)
  } catch (err) {
    console.log(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getAnunturile (req, res) {
  try {
    const queries = req.query
    console.log(queries)
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
    console.log(aftSql)
    let ress = await AnuntRepository.getForHorzBlock(aftSql)

    let items = ress.rows
    return helper.sendData({ items }, res)
  } catch (err) {
    console.log(err)
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
