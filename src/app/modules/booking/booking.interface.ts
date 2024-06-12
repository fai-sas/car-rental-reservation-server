import { Schema } from 'mongoose'

export interface TBooking {
  date: String
  user: Schema.Types.ObjectId
  car: Schema.Types.ObjectId
  startTime: string
  endTime: string
  totalCost: number
  isBooked: 'unconfirmed' | 'confirmed'
}
