/* eslint-disable no-unused-vars */
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
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      select: false,
      validate: {
        validator: function (this: TUser) {
          return this.password === this.confirmPassword
        },
        message: 'Passwords do not match',
      },
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
    termsAccepted: {
      type: Boolean,
      required: [true, 'You must accept the terms and conditions'],
      validate: {
        validator: function (value: boolean) {
          return value === true
        },
        message: 'You must accept the terms and conditions to sign up',
      },
    },
  },

  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

userSchema.pre('save', async function (next) {
  this.confirmPassword = await bcrypt.hash(
    this.confirmPassword,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email })
}

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

export const User = model<TUser, UserModel>('User', userSchema)
