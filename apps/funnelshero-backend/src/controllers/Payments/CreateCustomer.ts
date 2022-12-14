import {Request, Response} from 'express'
import {Stripe} from '../../lib'

export const CreateCustomer = async (
	req: Request,
	res: Response,
) => {
	try {

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
