/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'user' | 'admin'
  phone?: string
  address: string
  termsAccepted: boolean
  passwordChangedAt?: Date
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(id: string): Promise<TUser>

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
