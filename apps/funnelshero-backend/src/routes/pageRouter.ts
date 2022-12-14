import express from 'express'
import {CreatePage, UpdatePage, DeletePage, GetAllPages, GetPageById} from '../controllers'
import {authenticateUser} from '../middlewares'

const router = express()

router.route('/').post(authenticateUser, CreatePage)
router.route('/').get(authenticateUser, GetAllPages)
router.route('/:id').get(authenticateUser, GetPageById)
router.route('/:id').put(authenticateUser, UpdatePage)
router.route('/:id').delete(authenticateUser, DeletePage)
export default router