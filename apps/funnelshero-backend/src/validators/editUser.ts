import Joi from 'joi'

export const userEditSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		firstName: Joi.string().min(1).max(100).label('firstName'),
		lastName: Joi.string().min(1).max(100).label('lastName'),
		picture: Joi.binary(),
	})
