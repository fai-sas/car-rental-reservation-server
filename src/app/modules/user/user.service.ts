import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import { createToken, verifyToken } from './user.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: TUser) => {
  const existingUser = await User.findOne({ email: payload.email })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  if (payload.password !== payload.confirmPassword) {
    throw new Error('Passwords do not match')
  }

  if (!payload.termsAccepted) {
    throw new Error('You must accept the terms and conditions')
  }

  const result = await User.create(payload)

  const userObj = result?.toObject()
  delete userObj?.password
  delete userObj?.confirmPassword

  return userObj
}

const signInUserIntoDb = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ email: payload.email }).select('+password')
  // const user = await User.findOne({ email: payload.email })

  // check if user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check if password is correct
  if (
    !(await User.isPasswordMatched(payload?.password as string, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match')
  }

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  )

  // user.password = undefined

  return { user, accessToken, refreshToken }
}

const getAllUsersFromDb = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDb = async (id: string) => {
  const result = await User.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested User Not Found')
  }

  return result
}

const updateUserIntoDb = async (id: string, payload: Partial<TUser>) => {
  const isUserExists = await User.findById(id)

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested User Not Found')
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteUserFromDb = async (id: string) => {
  const isUserExists = await User.findById(id)

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Car Not Found')
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { email, iat } = decoded

  // checking if the user is exist
  const user = await User.isUserExists(email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  )

  return {
    accessToken,
  }
}

export const UserServices = {
  signUpUserIntoDb,
  signInUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  updateUserIntoDb,
  deleteUserFromDb,
  refreshToken,
}
