import { USER_ROLE } from './user.constant'

export interface TUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  phone: number
  address: string
}

export type TUserRole = keyof typeof USER_ROLE
