import {Request, Response} from 'express'
import {Stripe, prisma} from '../../lib'
import {UserState} from '../../types'

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const user = req.user;

	const {stripeId, _id: userId} = user
	const {priceId, paymentMethodId} = req.body

	try {
		if (!priceId || priceId === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing priceId',
						field: 'priceId',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		const paymentMethod = await Stripe.paymentMethods.attach(paymentMethodId, {
			customer: stripeId,
		})

		const _customer = await Stripe.customers.retrieve(stripeId)

		console.log(_customer)

		//@ts-ignore
		if (_customer?.invoice_settings?.default_payment_method === null) {
			await Stripe.customers?.update(stripeId, {
				invoice_settings: {
					default_payment_method: paymentMethod?.id,
				},
			})
		}

		const priceData = await Stripe.prices.retrieve(priceId)

		// check if the price is recurring or not

		let subscription
		if (priceData.recurring !== null) {
			subscription = await Stripe.subscriptions.create({
				customer: stripeId,
				items: [{price: priceId}],
				expand: ['latest_invoice.payment_intent'],
			})
		} else {
			if (priceData.unit_amount) {
				const paymentIntent = await Stripe.paymentIntents.create({
					customer: stripeId,
					currency: 'usd',
					amount: priceData.unit_amount,
				})

				subscription = await Stripe.paymentIntents.confirm(paymentIntent.id, {
					payment_method: paymentMethodId,
					receipt_email: user.email,
				})
			}
		}
		if (!subscription) {
			return res
				.status(500)
				.json({statusCode: 500, message: 'Error creating a subscription'})
		} else {
			const updatedUser = await prisma.user.update({
				where: {
					userId,
				},
				data: {
					activeSubscription: subscription.id,
					activePrice: priceId as string,
					status: UserState.SUB_ACTIVE,
				},
			});

			//@ts-ignore
			delete updatedUser.password;

			res.status(200).json({
				message: 'Subscription was created successfully',
				subscription: subscription.id,
				user: updatedUser,
			})
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
}
