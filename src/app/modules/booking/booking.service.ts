import { TBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await Booking.create(payload)
  return (await result.populate('user')).populate('car')
}

const getAllBookingsFromDb = async (query: Record<string, unknown>) => {
  const result = await Booking.find()
  return result
}

const getUserBookingsFromDb = async () => {
  const result = await Booking.find()

  return result
}

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
}
