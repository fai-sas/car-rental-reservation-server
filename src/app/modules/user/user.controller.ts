import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import config from '../../config'

const signUpUser = catchAsync(async (req, res) => {
  const result = await UserServices.signUpUserIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const signInUser = catchAsync(async (req, res) => {
  const result = await UserServices.signInUserIntoDb(req.body)
  const { refreshToken, accessToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
    },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await UserServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb()

  if (result.length === 0) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.getSingleUserFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

// const getUser = catchAsync(async (req, res) => {
//   const userId = req?.user?.userId

//   const result = await UserServices.getUserProfile(userId)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User profile retrieved successfully',
//     data: result,
//   })
// })

const getUser = catchAsync(async (req, res) => {
  const userId = req.user?.userId // Extract user ID from req.user

  if (!userId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'User ID not provided',
    })
  }

  const result = await UserServices.getUserProfile(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.updateUserIntoDb(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.deleteUserFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  })
})

export const UserControllers = {
  signUpUser,
  signInUser,
  refreshToken,
  getAllUsers,
  getSingleUser,
  getUser,
  updateUser,
  deleteUser,
}
