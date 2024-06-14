import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingServices } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const user = req.user.userId
  const result = await BookingServices.createBookingIntoDb(req.body, user)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car booked successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query
  const result = await BookingServices.getAllBookingsFromDb(
    carId as string,
    date as string
  )

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
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user.userId
  const result = await BookingServices.getUserBookingsFromDb(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Bookings retrieved successfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
}
