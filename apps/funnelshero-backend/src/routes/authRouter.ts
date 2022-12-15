import express from 'express'
import {Signin, Signup, VerifyEmail, RefreshToken} from '../controllers'
import {ValidateSignup} from '../middlewares'
import * as validate from '../middlewares/validate';
import { userSignupSchema } from '../validators/signupRequest';

const router = express()

router.route('/sign-up').post(validate.schema(userSignupSchema), Signup)
router.route('/sign-in').post(Signin)
router.route('/verify').post(VerifyEmail)
router.route('/refresh-token').post(RefreshToken)
export default router
