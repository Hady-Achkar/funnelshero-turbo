import Joi from 'joi'

export const verifySchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		userId: Joi.number().label('userId').required(),
		code: Joi.string().label('code').required(),
	})
