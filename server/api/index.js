import { Router } from 'express'

import AnuntController from '../controllers/AnuntController'
import users from './users'

var router = Router()

// Add USERS Routes
router.use(users)

router.post('/anunt/add', AnuntController.add)

export default router
