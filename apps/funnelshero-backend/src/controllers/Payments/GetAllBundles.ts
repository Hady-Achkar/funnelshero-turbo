import {Request, Response} from 'express'
import {Stripe} from '../../lib'

export const GetAllBundles = async (
	req: Request,
	res: Response,
) => {
	try {
		const prices = await Stripe.prices.list({
			expand: ['data.product'],
			active: true,
		})
		return res.status(200).json({
			status: 'Success',
			message: 'Prices fetched',
			prices: prices.data,
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
