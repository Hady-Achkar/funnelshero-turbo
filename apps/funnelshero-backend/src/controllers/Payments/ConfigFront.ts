import {Request, Response} from 'express'
import {Stripe} from '../../lib'

export const ConfigFront = async (
	req: Request,
	res: Response,
) => {
	try {
		const publicStripeKey = process.env.STRIPE_PUBLISH_KEY
		return res.status(200).json({
			status: 'Success',
			message: 'Public key retrieved',
			publicKey: publicStripeKey,
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
