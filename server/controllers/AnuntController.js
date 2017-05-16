import helper from './_helperController'
import AnuntRepository from '../repositories/AnuntRepository'
import ImageRepository from '../repositories/ImageRepository'
import * as Joi from 'joi'

export default {
  add
}

async function add (req, res) {
  try {
    let schema = {
      catAnunt: Joi.any().only([1, 2]).required().label('Categoria anuntului'),
      tipAnunt: Joi.any().only([1, 2]).required().label('Tipul anuntului'),
      title: Joi.string().required().label('Denumirea'),
      describe: Joi.string().required().label('Descrierea'),
      price: Joi.number().positive().required().label('Pretu'),
      images: Joi.array().items(Joi.string().uri()).label('Imaginile anuntului')
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
