import { TBooking } from './booking.interface'

const createBookingIntoDb = async (payload: TBooking) => {}

const getAllBookingsFromDb = async (query: Record<string, unknown>) => {}

const getUserBookingsFromDb = async () => {}

export const CarServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
}
