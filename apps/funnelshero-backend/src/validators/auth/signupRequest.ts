import Joi from 'joi'

export const userSignupSchema = Joi.object()
	.options({abortEarly: false})
	.keys({
		firstName: Joi.string().min(4).max(100).label('firstName').required(),
		lastName: Joi.string().min(4).max(100).label('lastName').required(),
		priceId: Joi.string().min(4).max(100).label('priceId').required(),
		username: Joi.string().min(4).max(100).label('priceId').required(),
		cardNumber: Joi.string().min(4).max(100).label('priceId').required(),
		expMonth: Joi.number(),
		expYear: Joi.number(),
        cvc: Joi.number(),
		email: Joi.string().min(10).max(100).label('Email').required(),
		password: Joi.string().min(6).max(100).label('Password').required(),
	})
