import {Request, Response} from 'express'
import {prisma} from '../../lib'

interface UpdateFunnelDto {
  title?: string,
  image?: string,
  metatags?: string,

  category?: boolean,
  baseDomain?: string,
  proDomain?: string,
  favicon?: string,

  isActive?: boolean,
  allowedNotifications?: boolean,
}

export default async (req: Request, res: Response) => {
  try {
    const funnel = await prisma.funnel.findUnique({
      where: {
        funnelId: Number(req.params.id),
      },
    });

    if (!funnel) {
      return res.status(404).json({
        message: 'Funnel not found',
      });
    }

    const updatedPage = await prisma.funnel.update({
      where: {
        funnelId: funnel.funnelId,
      },
      data: {
        ...req.body,
      },
    });

    res.json(updatedPage);
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