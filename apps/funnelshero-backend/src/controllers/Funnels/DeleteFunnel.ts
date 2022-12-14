import {Request, Response} from 'express'
import {prisma} from '../../lib'

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

    await prisma.funnel.delete({
      where: {
        funnelId: Number(req.params.id),
      }
    });

    res.sendStatus(204);
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