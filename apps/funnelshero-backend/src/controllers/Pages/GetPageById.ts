import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
	try {
		const pageId = Number(req.params.id)
		const page = await prisma.page.findUnique({
			where: {
				pageId,
			},
		})

		if (!page) {
			return res.status(404).json({
				error: 'Page not found',
			})
		}

		res.json(page)
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
