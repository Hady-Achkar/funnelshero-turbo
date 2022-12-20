import Joi from 'joi'

export const userSigninSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		lastName: Joi.string().min(10).max(100).label('EmalastNameil').required(),
		password: Joi.string().min(6).max(100).label('Password').required(),
	})
