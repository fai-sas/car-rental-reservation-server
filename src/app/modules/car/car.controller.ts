import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CarServices } from './car.service'

const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car created successfully',
    data: result,
  })
})

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarsFromDb()

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
    message: 'Cars retrieved successfully',
    data: result,
  })
})

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CarServices.getSingleCarFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  })
})

const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CarServices.updateCarIntoDb(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  })
})

const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CarServices.deleteCarFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  })
})

const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body
  const result = await CarServices.returnCarIntoDb({ bookingId, endTime })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car returned successfully',
    data: result,
  })
})

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
}
