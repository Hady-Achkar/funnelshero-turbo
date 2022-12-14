import {Request, Response} from 'express'
import {Stripe, prisma} from '../../lib'

export default async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const {stripeId, _id: userId, activeSubscription} = req.user;
	  const { priceId } = req.body;

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

    const _customer = await Stripe.customers.retrieve(stripeId);

    if (!_customer) {
      return res.status(400).json({
				status: 'Failure',
				message: 'Customer not found',
				requestTime: new Date().toISOString(),
			})
    }
    
    const subscription = await Stripe.subscriptions.update(
      activeSubscription,
      {
        items: [{
          price: priceId,
        }]
      }
    )

    // const updatedUser = await Users.findByIdAndUpdate(
    //   UserId,
    //   {
    //     $set: {
    //       activePrice: priceId as string,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // ).select('-password');

    const updatedUser = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        activePrice: priceId as string,
      }
    })

    //@ts-ignore
    delete updatedUser.password;

    res.status(200).json({
      message: 'Subscription plan was updated successfully',
      subscription: subscription.id,
      user: updatedUser,
    })
  } catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
  
}