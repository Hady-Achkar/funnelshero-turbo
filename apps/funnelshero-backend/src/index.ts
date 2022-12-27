import express from 'express'
import * as dotenv from 'dotenv'
import {
	AuthRouter,
	UserRouter,
	FunnelRouter,
	PageRouter,
	PaymentRouter,
} from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import { StripeWebhooks } from './controllers'
import genericErrorHandler from './middlewares/genericErrorHandler';


const main = async () => {
	dotenv.config()

	const app = express()

	app.post('/webhook', express.raw({type: 'application/json'}), StripeWebhooks);

	app.use(cors())
	app.use(
		express.json({
			limit: '50mb',
		}),
	)
	app.use(morgan('dev'))


	app.use('/', async (req, _, next) => {
		try {
			const userIp = req.headers['x-real-ip']
			//@ts-ignore
			req.userIP = userIp
			next()
		} catch (error) {
			console.log(error)
		}
	})

	app.use('/auth', AuthRouter)
	app.use('/users', UserRouter)
	app.use('/funnels', FunnelRouter)
	app.use('/pages', PageRouter)
	app.use('/payments', PaymentRouter)
	app.use(genericErrorHandler);

	app.listen(process.env.MAIN_PORT, () => {
		console.log(`[i] Server is listening on port ${process.env.MAIN_PORT}`)
	})
}
main()
