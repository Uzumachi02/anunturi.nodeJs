import helper from './_helperController'
import UserRepository from '../repositories/UserRepository'
import UserPhoneRepository from '../repositories/UserPhoneRepository'
import * as Joi from 'joi'

export default {
  create,
  logare
}

async function create (req, res) {
  try {
    let schema = {
      login: Joi.string().min(4).max(64).required(),
      password: Joi.string().min(6).max(32).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().integer().min(8).required()
    }

    let body = req.body
    let validAnunt = await helper.loadSchema(body, schema)

    let insert = {
      login: validAnunt.login,
      password: validAnunt.password,
      email: validAnunt.email,
      reg_dt: 'NOW()'
    }

    let userRes = await UserRepository.add(insert)
    let usId = userRes.rows[0].id

    insert = {
      user_id: usId,
      number: validAnunt.phone
    }

    await UserPhoneRepository.add(insert)
    return helper.sendData({ usId }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function logare (req, res) {
  try {
    console.log(req.session.authUser)
    let body = req.body
    let schema = {
      login: Joi.string().min(4).max(64).required(),
      password: Joi.string().min(6).max(32).required()
    }
    let validAnunt = await helper.loadSchema(body, schema)

    let user = await UserRepository.getUser([ validAnunt.login, validAnunt.password ])
    if( user.rowCount < 1 ) {
      throw 'user not found'
    }
    req.session.authUser = user.rows[0]
    return helper.sendData({ user: user.rows[0] }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}
