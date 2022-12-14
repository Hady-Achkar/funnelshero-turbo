import {Response} from 'express'
import {CustomRequest, IAddPaymentMethod} from '../../types'
import {Stripe} from '../../lib';

export const AddNewPaymentMethod = async (
	req: CustomRequest<IAddPaymentMethod>,
	res: Response,
) => {
	try {
		const {paymentMethodId} = req.body
		//@ts-ignore
		const {stripeId} = req.user
		if (!paymentMethodId || paymentMethodId === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing paymentMethodId',
						field: 'paymentMethodId',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		const paymentMethod = await Stripe.paymentMethods.attach(
			paymentMethodId,
			{customer: stripeId},
		)
		await Stripe.customers?.update(stripeId, {
			invoice_settings: {
				default_payment_method: paymentMethod?.id,
			},
		})
		res.status(200).json({
			status: 'Success',
			message: 'Payment method was added successfully',
			paymentMethod,
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
