import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { CarRoutes } from '../modules/car/car.route'
import { BookingRoutes } from '../modules/booking/booking.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes,
  },
  {
    path: '/cars',
    routes: CarRoutes,
  },
  {
    path: '/bookings',
    routes: BookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
