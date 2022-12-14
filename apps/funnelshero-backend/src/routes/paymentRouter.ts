import express from 'express'
import {authenticateUser} from '../middlewares'
import {
  GetAllBundles,
  CreateCustomer,
  BundleSub,
  AddNewPaymentMethod,
  CreatePaymentIntent,
  CreateFreeTrial,
  CancelSubscription,
  UpdateSubPlan,
  CreatePaymentMethod,
  ChangeDefaultPayment,
  GetStripeKey,
} from '../controllers'

const router = express()

router.route('/bundles').get(authenticateUser, GetAllBundles)
router.route('/customers').post(authenticateUser, CreateCustomer)
router.route('/bundles/sub').post(authenticateUser, BundleSub)
router.route('/methods').put(authenticateUser, AddNewPaymentMethod)
router.route('/intents').post(authenticateUser, CreatePaymentIntent)
router.route('/sub/trial').post(authenticateUser, CreateFreeTrial)
router.route('/sub/cancel').delete(authenticateUser, CancelSubscription)
router.route('/sub').put(authenticateUser, UpdateSubPlan)
router.route('/methods').post(authenticateUser, CreatePaymentMethod)
router.route('/default').put(authenticateUser, ChangeDefaultPayment)
router.route('/stripe-key').get(authenticateUser, GetStripeKey)

export default router