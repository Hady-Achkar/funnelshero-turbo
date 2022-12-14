import express from 'express'
import {EditUser} from '../controllers'
import {authenticateUser} from '../middlewares'

const router = express()

router.route('/me').put(authenticateUser, EditUser)
export default router