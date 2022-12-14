import {Request, Response} from 'express'

export default async (req: Request, res: Response) => {
  try {
    res.json({
      stripePubKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
  
}