import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CarValidation } from './car.validation'
import { CarControllers } from './car.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  auth('admin'),
  validateRequest(CarValidation.createCarValidationSchema),
  CarControllers.createCar
)

router.get('/', CarControllers.getAllCars)

router.get('/:id', CarControllers.getSingleCar)

router.put('/:id', auth('admin'), CarControllers.updateCar)

router.delete('/:id', auth('admin'), CarControllers.deleteCar)

// TODO: Route: /api/cars/return(PUT)
// router.put('/return', auth('admin'), CarControllers.returnCar)
router.patch('/return', auth('admin'), CarControllers.returnCar)

export const CarRoutes = router
