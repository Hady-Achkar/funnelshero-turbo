import {Request, Response} from 'express'
import {prisma} from '../../lib'

interface EditUserDto {
	first_name?: string
	last_name?: string
}

interface AuthRequest extends Request {
	user?: {
		email: string,
		fullName: string,
		_id: number,
		stripeId: string,
	}
}

export default async (req: AuthRequest, res: Response) => {
	try {
		console.log(6);
		const updateData: EditUserDto = {}

		if (req.body.firstName) {
			updateData.first_name = req.body.firstName
		}

		if (req.body.lastName) {
			updateData.last_name = req.body.lastName
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
