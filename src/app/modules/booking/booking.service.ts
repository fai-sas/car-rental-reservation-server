import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Car } from '../car/car.model'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'
import { ObjectId, Types } from 'mongoose'

const createBookingIntoDb = async (
  payload: Partial<TBooking>,
  userId: string
) => {
  const isCarExists = await Car.findById(payload?.car)

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car Not Found')
  }

  const newBooking = new Booking({
    ...payload,
    user: new Types.ObjectId(userId),
  })

  const result = (
    await (await Booking.create(newBooking)).populate('user')
  ).populate('car')

  return result
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

  const result = await Booking.find(filter).populate('user').populate('car')
  console.log(result)

  return result
}

const getUserBookingsFromDb = async (userId: ObjectId) => {
  // const result = await Booking.find({ userId })
  const result = await Booking.find({ userId }).populate('user')

  console.log('getUserBookingsFromDb:', { userId, result })
  return result
}

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
}
