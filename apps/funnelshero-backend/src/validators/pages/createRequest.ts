import Joi from 'joi'

export const pageCreateSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
        funnelId: Joi.number().label('funnelId').required(),
		title: Joi.string().min(4).max(100).label('title').required(),
		data: Joi.string().label('data').required(),
	})
