import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Car } from '../car/car.model'
import { TBooking } from './booking.interface'
import { Booking } from './booking.model'
import mongoose, { Types } from 'mongoose'

const createBookingIntoDb = async (
  payload: Partial<TBooking>,
  userId: string
) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const isCarExists = await Car.findById(payload?.car)

    if (!isCarExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Car Not Found')
    }

    const newBooking = new Booking({
      ...payload,
      user: new Types.ObjectId(userId),
    })

    const result = await Booking.create([newBooking], { session })

    await result[0].populate('user')
    await result[0].populate('car')

    await Car.updateOne(
      { _id: payload.car },
      { status: 'unavailable' }
    ).session(session)

    await session.commitTransaction()
    session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Booking')
  }
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

const getUserBookingsFromDb = async (userId: string) => {
  const user = new Types.ObjectId(userId)

  const result = await Booking.find({ user }).populate('user').populate('car')

  return result
}

export const BookingServices = {
  createBookingIntoDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
}
