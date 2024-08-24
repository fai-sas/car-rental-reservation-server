/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface TCar {
  name: string
  description: string
  color: string
  status: 'available' | 'unavailable' | 'booked' | 'returned'
  features:
    | string[]
    | 'GPS'
    | 'Child Seat'
    | 'Bluetooth'
    | 'Backup Camera'
    | 'Heated Seats'
    | 'Sunroof'
    | 'All-Wheel Drive'
  pricePerHour: number
  location:
    | 'New York'
    | 'Los Angeles'
    | 'Chicago'
    | 'Houston'
    | 'Phoenix'
    | 'Philadelphia'
    | 'San Antonio'
    | 'San Diego'
    | 'Dallas'
    | 'San Jose'
  images: string[]
  year: number
  model: string
  seats: number
  fuelType: string
  transmission: 'automatic' | 'manual'
  isDeleted: boolean
}

export interface CarModel extends Model<TCar> {
  //instance methods for checking if the car exist
  isCarExists(name: string): Promise<TCar>
}
