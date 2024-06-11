import { TUser } from './user.interface'

const signUpUserIntoDb = async (payload: TUser) => {}

const signInUserIntoDb = async (payload: Partial<TUser>) => {}

export const UserServices = {
  signUpUserIntoDb,
  signInUserIntoDb,
}
