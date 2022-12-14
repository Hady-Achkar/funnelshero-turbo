export { IUser, UserType, UserState } from './IUser';
import { Request } from 'express';
export { ISignup } from './Signup.body';
export { ISignin } from './Signin.body';
export {IAddPaymentMethod} from './IAddPaymentMethod'

export interface CustomRequest<T> extends Request {
  readonly body: T;
}
