import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { CarRoutes } from '../modules/car/car.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
