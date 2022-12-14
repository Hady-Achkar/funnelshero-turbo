import * as bcrypt from 'bcryptjs'
import {Response} from 'express'
import * as jwt from 'jsonwebtoken'
import {CustomRequest, ISignup} from '../../types'
import {UserType} from '../../types'
import {Stripe, prisma, sendMail} from '../../lib'
import generator from 'generate-password'

export default async (req: CustomRequest<ISignup>, res: Response) => {
	try {
		const {
			email,
			password,
			username,
			priceId,
			lastName,
			firstName,
			city,
			country,
			address1,
			address2,
			postalCode,
			phoneNumber,
			state,
			cardNumber,
			expMonth,
			expYear,
			cvc,
		} = req.body

		const _verify = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (_verify) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Email is already in use.',
						field: 'email',
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

		const hashedPassword = await bcrypt.hash(password, 10);

		const customer = await Stripe.customers.create({
			email,
		});

		const paymentMethod = await Stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      },
			billing_details: {
				email,
				name: `${firstName} ${lastName}`,
				phone: phoneNumber,
				address: {
					city,
					country,
					line1: address1,
					line2: address2,
					postal_code: postalCode,
					state,
				}
			}
    });

		await Stripe.paymentMethods.attach(
			paymentMethod.id,
			{customer: customer.id},
		)

		await Stripe.customers.update(customer.id, {
			invoice_settings: {
				default_payment_method: paymentMethod?.id,
			},
		})

		const subscription = await Stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 14,
      off_session: true,
    })

		const NEW_USER = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName,
				type: UserType.STANDARD,
				activePrice: priceId,
				activeSubscription: subscription.id,
				stripeId: customer.id,
				username,
			},
		});

		const genPass = generator.generate({
			length: 10,
			numbers: true
		});

		const hash = await bcrypt.hash(genPass, 10);

		await prisma.hash.create({
			data: {
				hash,
				userId: NEW_USER.userId,
			},
		})

		const url = `http://localhost:3000/auth/verify?userId=${NEW_USER.userId}&code=${genPass}`;
		const message = `Click on the following link to verify your email: ${url}`;

		await sendMail(NEW_USER.email, 'Verify account', message);
		console.log(url);

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
					// const stripeCustomerInfo = await Stripe.customers?.retrieve(NEW_USER.stripeId)
					const paymentMethods = await Stripe.paymentMethods?.list({
						customer: NEW_USER.stripeId || undefined,
						type: 'card',
					})
					const subscriptions = await Stripe.subscriptions?.list({
						customer: NEW_USER.stripeId || undefined,
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
						message: 'User account was created successfully.',
						token: encoded,
						refreshToken,
						fullName: `${NEW_USER.firstName} ${NEW_USER.lastName}`,
						email: NEW_USER.email,
						_id: NEW_USER.userId,
						type: UserType.STANDARD,
						stripeId: NEW_USER.stripeId,
						paymentMethods: paymentMethods.data,
						subscriptions: subscriptions.data,
						inTrial: NEW_USER.inTrial,
						isTrialLegit: NEW_USER.isTrialLegit,
						activeSubscription: NEW_USER.activeSubscription,
						requestTime: new Date().toISOString(),
					})
				}
			)
		}
	} catch (err) {
		if (err instanceof Error) {
			console.error(err)
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}
