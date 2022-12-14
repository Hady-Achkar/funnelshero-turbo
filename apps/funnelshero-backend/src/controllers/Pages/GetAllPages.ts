import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
	try {
    const funnelId = Number(req.query.funnelId) || 0;

		const pages = await prisma.page.findMany({
      where: {
        funnelId,
      }
    })

    res.json(pages);
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
