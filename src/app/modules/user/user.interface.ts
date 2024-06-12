import { USER_ROLE } from './user.constant'

export interface TUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  phone: string
  address: string
}

export type TUserRole = keyof typeof USER_ROLE
