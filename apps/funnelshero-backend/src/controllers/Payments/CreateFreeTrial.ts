import {Request, Response} from 'express'
import {Stripe, prisma} from '../../lib'
import {UserState} from '../../types'

export default async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const {stripeId, _id: UserId} = req.user;
	  const {priceId, paymentMethodId} = req.body;

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

    const _customer = await Stripe.customers.retrieve(stripeId);

    //@ts-ignore
		if (_customer?.invoice_settings?.default_payment_method === null) {
			await Stripe.customers?.update(stripeId, {
				invoice_settings: {
					default_payment_method: paymentMethod?.id,
				},
			})
		}

    const subscription = await Stripe.subscriptions.create({
      customer: stripeId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 14,
      off_session: true,
    })

    const updatedUser = await prisma.user.update({
      where: {
        userId: UserId,
      },
      data: {
        activeSubscription: subscription.id,
        activePrice: priceId as string,
        status: UserState.TRIAL,
      }
    })

    res.status(200).json({
      message: 'Free Trial was created successfully',
      subscription: subscription.id,
      user: updatedUser,
    })
  } catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
  
}