import Joi from 'joi'

export const refreshTokenSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		refreshToken: Joi.string().label('refreshToken').required()
	})
