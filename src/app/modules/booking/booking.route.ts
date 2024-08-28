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

router.get('/:id', BookingControllers.getSingleBooking)

router.put('/approve/:id', auth('admin'), BookingControllers.editBooking)

router.put(
  '/modify/:id',
  auth('admin', 'user'),
  BookingControllers.modifyBooking
)

router.delete('/:id', auth('admin', 'user'), BookingControllers.deleteBooking)

export const BookingRoutes = router
