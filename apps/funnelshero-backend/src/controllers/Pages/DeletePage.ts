import {Request, Response} from 'express'
import {prisma} from '../../lib'

export default async (req: Request, res: Response) => {
  try {
    const page = await prisma.page.findUnique({
      where: {
        pageId: Number(req.params.id),
      },
    });

    if (!page) {
      return res.status(404).json({
        message: 'Page not found',
      });
    }

    await prisma.page.delete({
      where: {
        pageId: Number(req.params.id),
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