import { Request, Response } from 'express';
import {Stripe} from '../../lib';

export default async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { stripeId } = req.user;
    const { paymentMethodId } = req.body;

    await Stripe.customers.update(stripeId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    res.json({
      message: 'Default payment method succesfuly changed',
    })
  } catch (err) {
    if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
  }
}