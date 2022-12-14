import { prisma } from '../../lib'
import {Response} from 'express'
import {CustomRequest} from '../../types'
import {ISignin} from '../../types'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import {UserType} from '../../types'
import {Stripe} from '../../lib'

export default async (req: CustomRequest<ISignin>, res: Response) => {
	try {
		const {email, password} = req.body

		if (!email || email === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing email',
						field: 'email',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		if (!password || password === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing password',
						field: 'password',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!user) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Email was not found',
				requestTime: new Date().toISOString(),
			})
		} else {
			const _verifyLogin = await bcrypt.compare(password, user.password)

			if (!_verifyLogin) {
				return res.status(401).json({
					status: 'Failure',
					message: 'Wrong credentials',
					requestTime: new Date().toISOString(),
				})
			}

			const payload = {
				email,
				fullName: `${user.firstName} ${user.lastName}`,
				_id: user.userId,
				stripeId: user.stripeId,
			}

			if (process.env.ACCESS_TOKEN_SECRET_V2) {
				jwt.sign(
					payload,
					process.env.ACCESS_TOKEN_SECRET_V2,
					{
						expiresIn: '24h',
					},
					async (_, encoded) => {
						console.log(`Access Token generated for Instructor : ${email}`)

						const stripeCustomerInfo = await Stripe.customers?.retrieve(user.stripeId || '')

						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: user.stripeId || undefined,
							type: 'card',
						})

						const subscriptions = await Stripe.subscriptions?.list({
							customer: user.stripeId || undefined,
							status: 'all',
							expand: ['data.default_payment_method'],
						})

						//@ts-ignore
						const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_V1);

						await prisma.token.create({
							data: {
								token: refreshToken,
							},
						});

						return res.status(200).json({
							status: 'success',
							message: 'User was logged in successfully.',
							token: encoded,
							refreshToken,
							fullName: `${user.firstName} ${user.lastName}`,
							email: user.email,
							_id: user.userId,
							type: UserType.STANDARD,
							stripeId: user.stripeId,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: user.inTrial,
							isTrialLegit: user.isTrialLegit,
							activeSubscription: user.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}