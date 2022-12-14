import {Request, Response} from 'express'
import {paypal, prisma} from '../../lib'
import {UserState} from '../../types'

const payment_json = {
	intent: 'sale',
	payer: {
		payment_method: 'paypal',
	},
	redirect_urls: {
		return_url: process.env.HOST + '/success',
		cancel_url: process.env.HOST + '/cancel',
	},
	transactions: [
		{
			item_list: {
				items: [
					{
						name: 'Virtal Business Card',
						description: '5 Qrcode for Virtal business card',
						quantity: 1,
						price: '5.00',
						tax: '0.45',
						currency: 'EUR',
						sku: '001',
					},
					{
						name: 'Qrcode for URL ',
						description: '10 Qrcode for URL dynamical',
						quantity: 1,
						price: '5.00',
						tax: '0.45',
						currency: 'EUR',
						sku: '002',
					},
				],
			},
			amount: {
				currency: 'EUR',
				total: '10.90',
				details: {
					shipping: '0', //transport
					subtotal: '10', // sous total
					shipping_discount: '0.00', //reduction transport
					insurance: '0.00', // assurance
					handling_fee: '0.00', // frais de gestion
					tax: '0.90', // tax
				},
			},
			description: 'Hat for the best team ever',
			payment_options: {
				allowed_payment_method: 'IMMEDIATE_PAY',
			},
		},
	],
}

const billingPlanAttributes = {
	description: 'Create Plan for Regular',
	merchant_preferences: {
		auto_bill_amount: 'yes',
		cancel_url: process.env.HOST + '/cancel',
		initial_fail_amount_action: 'continue',
		max_fail_attempts: '1',
		return_url: process.env.HOST + '/success',
		setup_fee: {
			currency: 'USD',
			value: '25',
		},
	},
	name: 'Testing1-Regular1',
	payment_definitions: [
		{
			amount: {
				currency: 'USD',
				value: '100',
			},
			charge_models: [
				{
					amount: {
						currency: 'USD',
						value: '10.60',
					},
					type: 'SHIPPING',
				},
				{
					amount: {
						currency: 'USD',
						value: '20',
					},
					type: 'TAX',
				},
			],
			cycles: '0',
			frequency: 'MONTH',
			frequency_interval: '1',
			name: 'Regular 1',
			type: 'REGULAR',
		},
		{
			amount: {
				currency: 'USD',
				value: '20',
			},
			charge_models: [
				{
					amount: {
						currency: 'USD',
						value: '10.60',
					},
					type: 'SHIPPING',
				},
				{
					amount: {
						currency: 'USD',
						value: '20',
					},
					type: 'TAX',
				},
			],
			cycles: '4',
			frequency: 'MONTH',
			frequency_interval: '1',
			name: 'Trial 1',
			type: 'TRIAL',
		},
	],
	type: 'INFINITE',
}

export default async (req: Request, res: Response) => {
	try {
		paypal.billingPlan.create(
			billingPlanAttributes,
			{},
			async (err: any, billingPlan: any) => {
				if (err) {
					console.error(err)
					if (err instanceof Error) {
						return res.status(500).json({statusCode: 500, message: err.message})
					}
				}
				// const updatedUser = await Users.findByIdAndUpdate(
				// 	//@ts-ignore
				// 	req.user._id,
				// 	{
				// 		$set: {
				// 			activeSubscription: billingPlan.id,
				// 			status: UserState.SUB_ACTIVE,
				// 		},
				// 	},
				// 	{
				// 		new: true,
				// 	}
				// ).select('-password')
				const updatedUser = await prisma.user.update({
					where: {
						//@ts-ignore
						userId: req.user._id,
					},
					data: {
						activeSubscription: billingPlan.id,
						status: UserState.SUB_ACTIVE,
					}
				});

				//@ts-ignore
				delete updatedUser.password;

				res.status(200).json({
					message: 'Subscription was created successfully',
					subscription: billingPlan.id,
					user: updatedUser,
				})
			}
		)
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
}
