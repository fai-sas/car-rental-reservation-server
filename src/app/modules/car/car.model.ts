import { Schema, model } from 'mongoose'
import { TCar } from './car.interface'

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: [true, 'The name of the car is required'],
    },
    description: {
      type: String,
      required: [true, 'A brief description of the car is required'],
    },
    color: {
      type: String,
      required: [true, 'The color of the car is required'],
    },
    isElectric: {
      type: Boolean,
      required: [true, 'It must be specified if the car is electric'],
    },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: {
      type: [String],
      required: [true, 'Features of the car are required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'The cost per hour of booking is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// filter out deleted documents
carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

carSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

export const Car = model<TCar>('Car', carSchema)
