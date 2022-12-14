import {Request, Response} from 'express'
import {Stripe} from '../../lib'

export const TestingTrialWillEnd = async (
	req: Request,
	res: Response,
) => {
	try {
		const endpointSecret = 'whsec_HwdMAYibQfC4i3xTfsUGR3mXcMH0yMQr'
		const sig = req.headers['stripe-signature']

		let event
		try {
			// @ts-ignore
			event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
			console.log('asdnkajsndkjasnd')
		} catch (err) {
			// @ts-ignore
			res.status(400).send(`Webhook Error: ${err.message}`)
			return
		}

		console.log('event',event)
		// Handle the event
		switch (event.type) {
			case 'payment_intent.succeeded':
				const paymentIntent = event.data.object
				// Then define and call a function to handle the event payment_intent.succeeded
				break
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`)
		}

		// Return a 200 response to acknowledge receipt of the event
		return res.status(200).json({
			status: 'Success',
			message: 'Event was triggered successfully',
			event,
			requestTime: new Date().toISOString(),
		})
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
