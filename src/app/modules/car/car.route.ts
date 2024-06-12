import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarValidation } from './car.validation'
import { CarControllers } from './car.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(CarValidation.createCarValidationSchema),
  CarControllers.createCar
)

router.get('/', CarControllers.getAllCars)

router.get('/:id', CarControllers.getSingleCar)

router.put('/:id', CarControllers.updateCar)

router.delete('/:id', CarControllers.deleteCar)

// TODO: Route: /api/cars/return(PUT)
router.put('/return', CarControllers.returnCar)

export const CarRoutes = router
