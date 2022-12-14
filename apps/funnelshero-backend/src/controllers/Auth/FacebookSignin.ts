import * as bcrypt from 'bcryptjs'
import {Response} from 'express'
import {CustomRequest, ISignup} from '../../types'
import * as jwt from 'jsonwebtoken'
import {UserType} from '../../types'
import {v4} from 'uuid'
import {Stripe, prisma} from '../../lib'

export default async (req: CustomRequest<ISignup>, res: Response) => {
	try {
		const {email, firstName, lastName, priceId, username} = req.body

		const password = v4()
		const hashedPassword = await bcrypt.hash(password, 10);

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

		if (!firstName || firstName === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing fname',
						field: 'fname',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		if (!lastName || lastName === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing lname',
						field: 'lname',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		const _verify = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!_verify) {
			if (!priceId || priceId === '') {
				return res.status(400).json({
					status: 'Failure',
					errors: [
						{
							name: 'Wrong/missing priceId',
							field: 'priceId',
						},
					],
					requestTime: new Date().toISOString(),
				})
			}

			const _verifyPrice = await Stripe.prices?.retrieve(priceId)

			if (!_verifyPrice) {
				return res.status(404).json({
					status: 'Failure',
					message: 'Pricing was not found.',
					price: null,
					requestTime: new Date().toISOString(),
				})
			}

			const customer = await Stripe.customers.create({
				email,
			});

			const NEW_USER = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					firstName,
					lastName,
					type: UserType.FACEBOOK,
					activePrice: priceId,
					stripeId: customer.id,
					username,
				},
			});

			const payload = {
				email,
				fullName: `${NEW_USER.firstName} ${NEW_USER.lastName}`,
				_id: NEW_USER.userId,
				stripeId: NEW_USER.stripeId,
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
						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: NEW_USER.stripeId || undefined,
							type: 'card',
						})
						const subscriptions = await Stripe.subscriptions?.list({customer: NEW_USER.stripeId || undefined})

						return res.status(200).json({
							status: 'success',
							message: 'User account was created successfully.',
							token: encoded,
							fullName: `${NEW_USER.firstName} ${NEW_USER.lastName}`,
							email: NEW_USER.email,
							_id: NEW_USER.userId,
							stripeId: NEW_USER.stripeId,
							type: UserType.FACEBOOK,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: NEW_USER.inTrial,
							isTrialLegit: NEW_USER.isTrialLegit,
							activeSubscription: NEW_USER.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
		} else {
			const USER = await prisma.user.findFirst({
				where: {
					email,
					type: UserType.FACEBOOK,
				},
			})

			if (!USER) {
				return res.status(404).json({
					status: 'Failure',
					message: 'Bad request, User was not found.',
					requestTime: new Date().toISOString(),
				})
			}

			const payload = {
				email,
				fullName: `${USER.firstName} ${USER.lastName}`,
				_id: USER.userId,
				stripeId: USER.stripeId,
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
						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: USER.stripeId || undefined,
							type: 'card',
						})
						const subscriptions = await Stripe.subscriptions?.list({customer: USER.stripeId || undefined})
						return res.status(200).json({
							status: 'success',
							message: 'User account was created successfully.',
							token: encoded,
							fullName: `${USER.firstName} ${USER.lastName}`,
							email: USER.email,
							_id: USER.userId,
							type: UserType.FACEBOOK,
							stripeId: USER.stripeId,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: USER.inTrial,
							isTrialLegit: USER.isTrialLegit,
							activeSubscription: USER.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message)
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
};
