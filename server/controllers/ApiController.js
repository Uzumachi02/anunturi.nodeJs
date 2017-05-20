import helper from './_helperController'
import TipAnuntRepository from '../repositories/TipAnuntRepository'
import CatAnuntRepository from '../repositories/CatAnuntRepository'

export default {
  getAnuntTip,
  getDatesForAdd
}

async function getAnuntTip (req, res) {
  try {
    let tipArray = await TipAnuntRepository.getAll()
    return helper.sendData(tipArray.rows, res)
  } catch (err) {
    console.log(err)
    helper.sendFailureMessage(err, res)
  }
}

async function getDatesForAdd (req, res) {
  try {
    let tipArray = await TipAnuntRepository.getAll()
    let carArray = await CatAnuntRepository.getAll()

    let forRes = {
      tipAnunt: tipArray.rows,
      catAnunt: carArray.rows
    }

    return helper.sendData(forRes, res)
  } catch (err) {
    console.log(err)
    helper.sendFailureMessage(err, res)
  }
}
