import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const createBooking = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const getUserBookings = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  })
})

// TODO: Route: /api/cars/return(PUT)
const returnCar = catchAsync(async (req, res) => {
  const result = ''

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  returnCar,
}
