import express from 'express'
import {CreateFunnel, UpdateFunnel, DeleteFunnel, GetAllFunnels, GetFunnelById} from '../controllers'
import {authenticateUser} from '../middlewares'

const router = express()

router.route('/').get(authenticateUser, GetAllFunnels);
router.route('/:id').get(authenticateUser, GetFunnelById);
router.route('/').post(authenticateUser, CreateFunnel);
router.route('/:id').put(authenticateUser, UpdateFunnel);
router.route('/:id').delete(authenticateUser, DeleteFunnel);
export default router