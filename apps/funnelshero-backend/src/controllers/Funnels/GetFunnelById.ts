import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
	try {
		const funnelId = Number(req.params.id)
		const funnel = await prisma.funnel.findUnique({
			where: {
				funnelId,
			},
			include: {
				pages: true,
			},
		})

		if (!funnel) {
			return res.status(404).json({
				error: 'Funnel not found',
			})
		}

		res.json(funnel)
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
