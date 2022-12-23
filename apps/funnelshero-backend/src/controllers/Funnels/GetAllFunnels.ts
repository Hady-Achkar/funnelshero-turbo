import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
	try {
		//@ts-ignore
		const userId: number = req.user._id

		const funnels = await prisma.funnel.findMany({
			where: {
				userId,
			},
		})

		res.json(funnels)
	} catch (err) {
		console.error(err)
		if (err instanceof Error) {
			console.log(err.message)
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}
