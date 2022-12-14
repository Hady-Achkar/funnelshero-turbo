import {Request, Response} from 'express'
import {prisma} from '../../lib'
import InitialPage from '../../assets/initialPage.json'

export default async (req: Request, res: Response) => {
	try {
		const {category, title, image} = req.body

		if (!category || category === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing category',
						field: 'category',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		if (!title || title === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing title',
						field: 'title',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		//@ts-ignore
		const userId: number = req.user._id

		const createdFunnel = await prisma.funnel.create({
			data: {
				title,
				category,
				image,
				userId,
			},
		})

		const createdPage = await prisma.page.create({
			data: {
				title: 'Home',
				data: JSON.stringify(InitialPage),
				isPublished: true,
				publishedAt: new Date(),
				funnelId: createdFunnel.funnelId,
			},
		})

		return res.status(200).json({
			status: 'Success',
			message: 'Funnel was created successfully',
			funnel: {
				...createdFunnel,
				pages: [createdPage],
			},
		})
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
