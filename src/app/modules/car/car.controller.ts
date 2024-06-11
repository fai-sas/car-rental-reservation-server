import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const createCar = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car created successfully',
    data: result,
  })
})

const getAllCars = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  })
})

const getSingleCar = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  })
})

const updateCar = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  })
})

const deleteCar = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  })
})

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
}
