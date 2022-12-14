import { prisma } from '../../lib';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const tokenExists = await prisma.token.findUnique({
      where: {
        token: refreshToken,
      }
    });

    if (!tokenExists) {
      return res.sendStatus(403);
    }

    //@ts-ignore
    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET_V1, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      //@ts-ignore
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_V2);

      res.json({
        accessToken,
      });
    })

  } catch (err) {
    if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
  }
}