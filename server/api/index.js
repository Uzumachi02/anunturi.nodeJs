import { Router } from 'express'

import AnuntController from '../controllers/AnuntController'
import ApiController from '../controllers/ApiController'
import UserController from '../controllers/UserController'
import users from './users'

var router = Router()

// Add USERS Routes
router.use(users)

router.post('/anunt/add', AnuntController.add)

router.post('/anunt/edit', AnuntController.edit)

router.get('/getanunttip', ApiController.getAnuntTip)

router.get('/datesforadd', ApiController.getDatesForAdd)

router.get('/getanunt/:id', AnuntController.getAnuntById)

router.get('/delanunt/:id', AnuntController.remove)

router.get('/getanuntforhorzblock', AnuntController.getAnunForHorzBlock)

router.get('/getanunturile', AnuntController.getAnunturile)

router.get('/addview/:id', AnuntController.addview)

router.get('/togglestatus/:id', AnuntController.toggleStatus)

router.get('/foredit/:id', AnuntController.forEdit)

router.post('/register', UserController.create)

router.post('/logare', UserController.logare)

router.post('/logout', UserController.logout)

router.get('/getuser/:id', UserController.get)

router.post('/user/edit', UserController.edit)

export default router
