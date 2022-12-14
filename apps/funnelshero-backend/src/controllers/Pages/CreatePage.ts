import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
  try {
    const { title, data, funnelId } = req.body;

    if (!title || !data || !funnelId) {
      return res.status(400).json({
        message: 'Missing some required parameters',
      })
    }

    const funnel = await prisma.funnel.findUnique({
      where: {
        funnelId,
      }
    });

    if (!funnel) {
      return res.status(404).json({
        message: 'Funnel not found',
      });
    }

    const pageWithTitleExist = await prisma.page.count({
      where: {
        title,
        funnelId,
      },
    });

    if (pageWithTitleExist > 0) {
      return res.status(400).json({
        message: 'Page with that title already exists',
      });
    }

    const createdPage = await prisma.page.create({
      data: {
        funnelId,
        title,
        data,
      },
    });

    res.json(createdPage);
  } catch (err) {
    console.error(err)
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
  }
}