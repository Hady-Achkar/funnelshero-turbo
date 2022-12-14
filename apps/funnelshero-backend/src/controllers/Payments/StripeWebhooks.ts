import {Request, Response} from 'express'
import {sendMail, Stripe, prisma} from '../../lib'

export default async (req: Request, res: Response) => {
	try {
		const sig = req.headers['stripe-signature']

		let event

		try {
			event = Stripe.webhooks.constructEvent(
				req.body,
				sig || '',
				process.env.STRIPE_WEBHOOK_SECRET || ''
			)
		} catch (err: any) {
			return res.status(400).send(`Webhook Error: ${err.message}`)
		}

		switch (event.type) {
			case 'customer.subscription.trial_will_end':
				const subscription = event.data.object

				// const user = await User.findOne({
				// 	// @ts-ignore
				// 	stripeId: subscription.customer,
				// })

				const user = await prisma.user.findUnique({
					where: {
						// @ts-ignore
						stripeId: subscription.customer,
					}
				})

				if (!user) {
					return res.status(400).send('Webhook Error');
				}

				// @ts-ignore
				const {amount, currency} = subscription.plan

				const subject = 'Trial will end'
				const message = `3 days left for your trial to end. You will be charged ${amount} ${currency}`

				await sendMail(user.email, subject, message);

				break
			default:
				console.log(`Unhandled event type ${event.type}`)
		}

		res.send()
	} catch (err) {
		if (err instanceof Error) {
			res.sendStatus(500)
		}
	}
}
