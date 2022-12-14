export interface ILoginBody {
    email: string;
    password: string;
}

export interface IVerifyEmailBody {
    userId: number;
    code: string;
}

export interface IRegistrationBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    priceId: string;
    username: string;
    cardNumber: string;
    expMonth: number;
    expYear: number;
    cvc: string;
}
