import express from 'express'
import {Signin, Signup, VerifyEmail, RefreshToken} from '../controllers'
import {ValidateSignup} from '../middlewares'
import * as validate from '../middlewares/validate';
import { userSignupSchema } from '../validators/auth/signupRequest';
import { userSininSchema } from '../validators/auth/signinRequest';
import {  refreshTokenSchema } from '../validators/auth/refreshTokenRequest';
import { verifySchema } from '../validators/auth/verifyRequests';

const router = express()

router.route('/sign-up').post(validate.schema(userSignupSchema), Signup)
router.route('/sign-in').post(validate.schema(userSininSchema),Signin)
router.route('/verify').post(validate.schema(verifySchema),VerifyEmail)
router.route('/refresh-token').post(validate.schema(refreshTokenSchema),RefreshToken)

export default router
