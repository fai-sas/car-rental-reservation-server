import { TCar } from './car.interface'

const createCarIntoDb = async (payload: TCar) => {}

const getAllCarsFromDb = async () => {}

const getSingleCarFromDb = async (id: string) => {}

const updateCarIntoDb = async (id: string, payload: Partial<TCar>) => {}

const deleteCarFromDb = async (id: string) => {}

export const CarServices = {
  createCarIntoDb,
  getAllCarsFromDb,
  getSingleCarFromDb,
  updateCarIntoDb,
  deleteCarFromDb,
}
