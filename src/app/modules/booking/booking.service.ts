import { TBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await Booking.create(payload)
  return result
}

const getAllBookingsFromDb = async (query: Record<string, unknown>) => {
  const result = await Booking.find()
  return result
}

const getUserBookingsFromDb = async () => {}

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
}
