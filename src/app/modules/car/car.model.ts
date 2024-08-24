import { Schema, model } from 'mongoose'
import { CarModel, TCar } from './car.interface'

const carSchema = new Schema<TCar, CarModel>(
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

    status: {
      type: String,
      enum: ['available', 'unavailable', 'booked', 'returned'],
      default: 'available',
    },
    features: {
      type: [String],
      enum: [
        'GPS',
        'Child Seat',
        'Bluetooth',
        'Backup Camera',
        'Heated Seats',
        'Sunroof',
        'All-Wheel Drive',
      ],

      required: [true, 'Features of the car are required'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'The cost per hour of booking is required'],
    },
    location: {
      type: String,
      enum: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
      ],
      required: [true, 'The location of the car is required'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image of the car is required'],
    },
    year: {
      type: Number,
      required: [true, 'The manufacturing year of the car is required'],
    },
    model: {
      type: String,
      required: [true, 'The model of the car is required'],
    },
    seats: {
      type: Number,
      required: [true, 'The number of seats is required'],
    },
    fuelType: {
      type: String,
      required: [true, 'The fuel type of the car is required'],
    },
    transmission: {
      type: String,
      enum: ['automatic', 'manual'],
      required: [true, 'The transmission type is required'],
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

carSchema.statics.isCarExists = async function (name: string) {
  return await Car.findOne({ name })
}

export const Car = model<TCar, CarModel>('Car', carSchema)
