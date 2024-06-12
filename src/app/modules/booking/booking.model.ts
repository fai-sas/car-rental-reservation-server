import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: [true, 'Booking date is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car ID is required'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: String,
    // required: [true, 'End time is required'],
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isBooked: {
    type: String,
    enum: ['unconfirmed', 'confirmed'],
    default: 'unconfirmed',
  },
})

export const Booking = model<TBooking>('Booking', bookingSchema)
