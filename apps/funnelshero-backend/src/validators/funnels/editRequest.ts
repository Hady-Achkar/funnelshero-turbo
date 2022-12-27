import Joi from 'joi'

export const funnelEditSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		category: Joi.string().min(4).max(100).label('category').required(),
		title: Joi.string().min(4).max(100).label('title').required()
	})
