import Joi from 'joi'

export const userSininSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		firstName: Joi.string().min(4).max(100).label('firstName'),
		lastName: Joi.string().min(4).max(100).label('lastName')
	})
