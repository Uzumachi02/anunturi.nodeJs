import helper from './_helperController'
import UserRepository from '../repositories/UserRepository'
import UserPhoneRepository from '../repositories/UserPhoneRepository'
import * as Joi from 'joi'

export default {
  create,
  logare,
  logout,
  get,
  edit
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
      reg_dt: 'NOW()',
      online_dt: 'NOW()'
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
    let body = req.body
    let schema = {
      login: Joi.string().min(4).max(64).required(),
      password: Joi.string().min(6).max(32).required()
    }
    let validAnunt = await helper.loadSchema(body, schema)

    let user = await UserRepository.getUser([ validAnunt.login, validAnunt.password ])
    if( user.rowCount < 1 ) {
      throw 'Date incorecte'
    }
    await UserRepository.updateOnline(user.rows[0].id)
    req.session.authUser = user.rows[0]
    return helper.sendData({ user: user.rows[0] }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function logout (req, res) {
  try {
    delete req.session.authUser
    return helper.sendData({}, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function get (req, res) {
  try {
    const id = parseInt(req.params.id)

    let user = await UserRepository.getUserData(id)
    if( user.rowCount < 1 )
      throw 'User not found'

    let item = user.rows[0]
    let phones = await UserPhoneRepository.getForUser(id)
    item.phones = phones.rows

    return helper.sendData({ item }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}

async function edit (req, res) {
  try {
    if( !req.session.authUser )
      throw 'Necesită logare'

    if( req.session.authUser.id != req.body.id)
      throw 'Nu aveți acces'

    let schema = {
      id: Joi.number().integer().positive().required().label('Id'),
      f_name: Joi.any().optional().label('Numele'),
      l_name: Joi.any().optional().label('Prenumele'),
      p_name: Joi.any().optional().label('Patronimiul'),
      email: Joi.string().email().required(),
      phones: Joi.array().required().min(1).label('Imaginile anuntului'),
    }

    let data = req.body
    let validUser = await helper.loadSchema(data, schema)
    let update = {
      f_name: validUser.f_name,
      l_name: validUser.l_name,
      p_name: validUser.p_name,
      email: validUser.email
    }
    let where = [['id', req.session.authUser.id]]

    let ress = await UserRepository.edit(update, where)
    if( ress.rowCount < 1 )
      throw 'Nu aveți acces'

    if( req.body.isPhoneEdit )
      await UserPhoneRepository.add(validUser.id, validUser.phones)

    return helper.sendData({ id: validUser.id }, res)
  } catch (err) {
    console.error(err)
    helper.sendFailureMessage(err, res)
  }
}
