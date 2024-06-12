import { TCar } from './car.interface'
import { Car } from './car.model'

const createCarIntoDb = async (payload: TCar) => {
  const result = await Car.create(payload)
  return result
}

const getAllCarsFromDb = async () => {}

const getSingleCarFromDb = async (id: string) => {}

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
