import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'

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

router.get('/', auth('admin'), UserControllers.getAllUsers)

router.get('/:id', auth('admin'), UserControllers.getSingleUser)

router.put('/:id', auth('admin'), UserControllers.updateUser)

router.delete('/:id', auth('admin'), UserControllers.deleteUser)

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken
)

export const UserRoutes = router
