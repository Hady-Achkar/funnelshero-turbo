import express from 'express'
import {CreatePage, UpdatePage, DeletePage, GetAllPages, GetPageById} from '../controllers'
import {authenticateUser} from '../middlewares'
import * as validate from '../middlewares/validate';
import { idSchema } from '../validators/paramsIdRequest';
import { pageCreateSchema } from '../validators/pages/createRequest';

const router = express()

router.route('/').post(validate.schema(pageCreateSchema),authenticateUser, CreatePage)
router.route('/').get(authenticateUser, GetAllPages)
router.route('/:id').get(validate.params(idSchema),authenticateUser, GetPageById)
router.route('/:id').put(validate.params(idSchema),authenticateUser, UpdatePage)
router.route('/:id').delete(validate.params(idSchema),authenticateUser, DeletePage)
=======


export default router