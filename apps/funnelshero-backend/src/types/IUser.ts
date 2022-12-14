export enum UserType {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	STANDARD = 'STANDARD',
}

export interface IUser {
	fullName?: string
	fname: string
	lname: string
	password: string
	email: string
	type: UserType
	stripeId: string
	activeSubscription: string
	activePrice: string
	inTrial: boolean
	isTrialLegit: boolean
}


export enum UserState {
	TRIAL = 'TRIAL',
	TRIAL_END = 'TRIAL_END',
	BLOCKED = 'BLOCKED',
	SUB_ACTIVE = 'SUB_ACTIVE',
	CANCELED = 'CANCELED',
}