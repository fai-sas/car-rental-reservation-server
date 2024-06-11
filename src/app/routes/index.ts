import { Router } from 'express'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    // routes: UserRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
