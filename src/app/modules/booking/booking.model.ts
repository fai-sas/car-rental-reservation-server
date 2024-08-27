import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: [true, 'Booking date is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: [true, 'User ID is required'],
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// filter out deleted documents
bookingSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

bookingSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

export const Booking = model<TBooking>('Booking', bookingSchema)
