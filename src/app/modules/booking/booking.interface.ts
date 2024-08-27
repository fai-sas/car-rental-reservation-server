import { Schema } from 'mongoose'

export interface TBooking {
  date: string
  user: Schema.Types.ObjectId
  car: Schema.Types.ObjectId
  startTime: string
  totalCost: number
  isDeleted: boolean
  isApproved: boolean
  paymentStatus?: string
  nid: string
  drivingLicense: string
  paymentInfo: 'cash' | 'card'
  additionalOptions:
    | string[]
    | 'GPS'
    | 'Child Seat'
    | 'Bluetooth'
    | 'Backup Camera'
    | 'Heated Seats'
    | 'Sunroof'
    | 'All-Wheel Drive'
}
