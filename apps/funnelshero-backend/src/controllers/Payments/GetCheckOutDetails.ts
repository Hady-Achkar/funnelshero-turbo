import {Request, Response} from 'express'
import {Stripe} from '../../lib'

export const GetCheckOutDetails = async (
	req: Request,
	res: Response,
) => {
	try {
		const {priceId} = req.query
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
		const _verifyPriceId = await Stripe.prices?.retrieve(priceId.toString())
		if (!_verifyPriceId) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Price was not found',
				price: null,
				requestTime: new Date().toISOString(),
			})
		}
		return res.status(200).json({
			status: 'Success',
			message: 'Price was not found.',
			price: _verifyPriceId,
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
