import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TCar } from './car.interface'
import { Car } from './car.model'
import { Booking } from '../booking/booking.model'
import { calculateTotalCost } from './car.utils'
import mongoose, { Types } from 'mongoose'

const createCarIntoDb = async (payload: TCar) => {
  const result = await Car.create(payload)
  return result
}

const getAllCarsFromDb = async () => {
  const result = await Car.find()
  return result
}

const getSingleCarFromDb = async (id: string) => {
  const result = await Car.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Car Not Found')
  }

  return result
}

const updateCarIntoDb = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id)

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Car Not Found')
  }

  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteCarFromDb = async (id: string) => {
  const isCarExists = await Car.findById(id)

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Car Not Found')
  }

  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

const returnCarIntoDb = async (payload: {
  bookingId: string
  endTime: string
}) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const bookingId = new Types.ObjectId(payload.bookingId)

    const booking = await Booking.findById(bookingId).populate('car')

    console.log('return car service:', booking)

    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking Not Found')
    }

    if (!booking.car || !('pricePerHour' in booking.car)) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Car data not populated correctly'
      )
    }

    const pricePerHour = Number(booking.car.pricePerHour)

    booking.endTime = payload.endTime
    booking.totalCost = calculateTotalCost(
      booking.startTime,
      payload.endTime,
      pricePerHour
    )

    const result = await booking.save()

    await Car.updateOne({ _id: booking.car }, { status: 'available' })

    return (await result?.populate('user')).populate('car')
  } catch (error) {}
}

export const CarServices = {
  createCarIntoDb,
  getAllCarsFromDb,
  getSingleCarFromDb,
  updateCarIntoDb,
  deleteCarFromDb,
  returnCarIntoDb,
}
