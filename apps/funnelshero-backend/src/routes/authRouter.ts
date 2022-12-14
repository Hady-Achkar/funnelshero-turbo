import express from 'express'
import {Signin, Signup, VerifyEmail, RefreshToken} from '../controllers'
import {ValidateSignup} from '../middlewares'

const router = express()

router.route('/sign-up').post(ValidateSignup, Signup)
router.route('/sign-in').post(Signin)
router.route('/verify').post(VerifyEmail)
router.route('/refresh-token').post(RefreshToken)
export default router
