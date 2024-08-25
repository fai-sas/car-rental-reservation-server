/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface TCar {
  name: string
  description: string
  color: string
  status: 'available' | 'unavailable' | 'booked' | 'returned'
  carType: 'SUV' | 'Hybrid' | 'Sedan'
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
  image?: string
  year: number
  model: string
  seats: number
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
  transmission: 'automatic' | 'manual'
  isDeleted: boolean
}

export interface CarModel extends Model<TCar> {
  //instance methods for checking if the car exist
  isCarExists(name: string): Promise<TCar>
}
