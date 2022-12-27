import express from 'express'
import {CreateFunnel, UpdateFunnel, DeleteFunnel, GetAllFunnels, GetFunnelById} from '../controllers'
import {authenticateUser} from '../middlewares'
import * as validate from '../middlewares/validate';
import { idSchema } from '../validators/paramsIdRequest';


const router = express()

router.route('/').get(authenticateUser, GetAllFunnels);
router.route('/:id').get(validate.params(idSchema) ,authenticateUser, GetFunnelById);
router.route('/').post(authenticateUser, CreateFunnel);
router.route('/:id').put(validate.params(idSchema) ,authenticateUser, UpdateFunnel);
router.route('/:id').delete(validate.params(idSchema) ,authenticateUser, DeleteFunnel);

export default router