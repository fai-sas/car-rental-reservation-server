import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TCar } from './car.interface'
import { Car } from './car.model'

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

const updateCarIntoDb = async (id: string, payload: Partial<TCar>) => {}

const deleteCarFromDb = async (id: string) => {}

// TODO: Route: /api/cars/return(PUT)
const returnCarIntoDb = async (id: string, payload: Partial<TCar>) => {}

export const CarServices = {
  createCarIntoDb,
  getAllCarsFromDb,
  getSingleCarFromDb,
  updateCarIntoDb,
  deleteCarFromDb,
}
