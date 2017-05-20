import { Router } from 'express'

import AnuntController from '../controllers/AnuntController'
import ApiController from '../controllers/ApiController'
import UserController from '../controllers/UserController'
import users from './users'

var router = Router()

// Add USERS Routes
router.use(users)

router.post('/anunt/add', AnuntController.add)

router.get('/getanunttip', ApiController.getAnuntTip)

router.get('/datesforadd', ApiController.getDatesForAdd)

router.get('/getanunt/:id', AnuntController.getAnuntById)

router.get('/getanuntforhorzblock', AnuntController.getAnunForHorzBlock)

router.get('/getanunturile', AnuntController.getAnunturile)

router.get('/addview/:id', AnuntController.addview)

router.post('/register', UserController.create)

router.post('/logare', UserController.logare)

export default router
