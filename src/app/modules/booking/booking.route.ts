import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookingValidation } from './booking.validation'
import { BookingControllers } from './booking.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking
)

router.get('/', auth('admin'), BookingControllers.getAllBookings)

router.get('/my-bookings', auth('user'), BookingControllers.getUserBookings)

router.put('/:id', auth('admin', 'user'), BookingControllers.editBooking)

router.delete('/:id', auth('admin', 'user'), BookingControllers.deleteBooking)

export const BookingRoutes = router
