import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>(
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
      // select: false,
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
      type: String,
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

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email })
}

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
