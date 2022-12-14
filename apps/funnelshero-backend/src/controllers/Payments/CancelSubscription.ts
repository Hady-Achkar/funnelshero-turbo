import {Request, Response} from 'express'
import {Stripe, prisma} from '../../lib'
import {UserState} from '../../types'

export default async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;

    await Stripe.subscriptions.del(user.activeSubscription);

    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        activeSubscription: '',
        status: UserState.CANCELED,
      },
    });

    res.status(200).json({
      message: 'Your Subscription was canceled successfully',
    })
  } catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
  
}