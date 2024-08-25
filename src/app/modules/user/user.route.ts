import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserValidationSchema),
  UserControllers.signUpUser
)

router.post(
  '/signin',
  validateRequest(UserValidation.signInUserValidationSchema),
  UserControllers.signInUser
)

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken
)

export const UserRoutes = router
