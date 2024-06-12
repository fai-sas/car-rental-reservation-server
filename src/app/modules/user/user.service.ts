import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import { createToken } from './user.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const result = await User.create(payload)

  return result
}

const signInUserIntoDb = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  console.log({ jwtPayload, token })

  return { user, token }
}

export const UserServices = {
  signUpUserIntoDb,
  signInUserIntoDb,
}
