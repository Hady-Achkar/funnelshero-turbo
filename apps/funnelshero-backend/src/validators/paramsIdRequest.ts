import Joi from 'joi'

export const idSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		id: Joi.number().min(1).max(11).label('id').required()
	})
