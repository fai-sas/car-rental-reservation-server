import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not a valid role',
      },
    },
    phone: {
      type: Number,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<TUser>('User', userSchema)
