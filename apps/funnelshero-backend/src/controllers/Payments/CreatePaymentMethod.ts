import { Request, Response } from 'express';
import {Stripe} from '../../lib';

interface ICard {
  cardNumber: string,
  expMonth: number,
  expYear: number,
  cvc: string,
}

export default async (req: Request<ICard>, res: Response) => {
  try {
    //@ts-ignore
    const { stripeId } = req.user;
    const { cardNumber, expMonth, expYear, cvc } = req.body;

    if (!cardNumber || !expMonth || !expYear || !cvc) {
      return res.status(400).json({
				status: 'Failure',
				message: 'Missing some required parameters',
				requestTime: new Date().toISOString(),
			})
    }

    const customer = await Stripe.customers.retrieve(stripeId);

    const paymentMethod = await Stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      },
    });

    await Stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customer.id,
    });

    res.json({
      message: 'Payment method created succesfully',
      paymentMethodId: paymentMethod.id,
    })
  } catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
}