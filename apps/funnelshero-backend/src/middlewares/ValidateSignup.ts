import {NextFunction, Response} from 'express'
import {CustomRequest, ISignup} from '../types'

export const ValidateSignup = async (
	req: CustomRequest<ISignup>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {email, priceId, firstName, lastName, password, username} = req.body

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

		if (!firstName || firstName === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing firstName',
						field: 'firstName',
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
						name: 'Wrong/missing lastName',
						field: 'lastName',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

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

		if (!username) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing username',
						field: 'username',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		
		next()
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
