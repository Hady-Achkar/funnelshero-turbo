import {Request, Response} from 'express'
import {prisma} from '../../lib'

interface EditUserDto {
	firstName?: string
	lastName?: string
	picture?: string
}

interface AuthRequest extends Request {
	user?: {
		email: string,
		fullName: string,
		_id: number,
		stripeId: string,
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: AuthRequest, res: Response) => {
	try {
		const updateData: EditUserDto = {}

		if (req.body.firstName) {
			updateData.firstName = req.body.firstName
		}

		if (req.body.lastName) {
			updateData.lastName = req.body.lastName
		}

		if (req.body.picture) {
			updateData.picture = req.body.picture
		}

    const userId: number | undefined = req.user && req.user._id;

    if (userId) {
      const user = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          ...updateData,
        }
      });

			//@ts-ignore
			delete user.password;
  
      res.json({
        message: 'User successfully updated',
        user,
      })
    }
	} catch (err) {
		console.error(err);
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
