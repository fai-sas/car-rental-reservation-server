import { TBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDb = async (payload: TBooking) => {
  const result = await Booking.create(payload)
  return (await result.populate('user')).populate('car')
}

const getAllBookingsFromDb = async (carId: string, date: string) => {
  const filter: any = {}

  if (carId) {
    filter.car = carId
  }

  if (date) {
    filter.date = date
  }

  console.log({ filter })

  const result = await Booking.find(filter)
  console.log(result)

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
