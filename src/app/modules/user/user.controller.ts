import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.signUpUserIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const signInUser = catchAsync(async (req, res) => {})

export const UserControllers = {
  signUpUser,
  signInUser,
}
