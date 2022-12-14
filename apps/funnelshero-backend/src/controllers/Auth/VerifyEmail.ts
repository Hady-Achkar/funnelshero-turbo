import * as bcrypt from 'bcryptjs'
import { prisma } from '../../lib'
import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
  try {
    const { userId, code } = req.body;

		if (!userId || !code) {
      return res.status(400).json({
				status: 'Failure',
				message: 'Missing userId or hash',
				requestTime: new Date().toISOString(),
			})
    }

    const user = await prisma.user.findUnique({
      where: {
        userId: Number(userId),
      }
    });

    if (!user) {
      return res.status(400).json({
				status: 'Failure',
				message: 'User not found',
				requestTime: new Date().toISOString(),
			})
    }

    const hashRow = await prisma.hash.findUnique({
      where: {
        userId: user.userId,
      },
    });

    if (!hashRow) {
      return res.status(404).json({
        status: 'Failure',
				message: 'Link expired',
				requestTime: new Date().toISOString(),
      })
    }

    //@ts-ignore
    const isCorrect = await bcrypt.compare(code, hashRow?.hash);

    if (!isCorrect) {
      return res.status(400).json({
        status: 'Failure',
				message: 'Link is invalid',
				requestTime: new Date().toISOString(),
      })
    }

    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        verified: true,
      },
    })

    await prisma.hash.delete({
      where: {
        hashId: hashRow?.hashId,
      },
    });


    res.json({
      status: 'Success',
      message: 'Email is verified',
      requestTime: new Date().toISOString(),
    })
	} catch (err) {
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