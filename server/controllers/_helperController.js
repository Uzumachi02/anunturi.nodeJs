import * as Joi from 'joi'

export default {
  sendFailureMessage,
  sendData,
  loadSchema
}

function sendFailureMessage (error, res) {
  res.send({'status': 'failure', message: error})
}

function sendData (data, res) {
  data.status = 'success'
  res.send(data)
}

function loadSchema (data, schema) {
  let validationOptions = {
    stripUnknown: true,
    abortEarly: false
  }

  return new Promise(function (resolve, reject) {
    Joi.validate(data, schema, validationOptions, function (err, val) {
      if (!err) return resolve(val)
      return reject(err)
    })
  })
}
