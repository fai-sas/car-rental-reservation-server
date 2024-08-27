import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import path from 'path'

const app: Application = express()

//parsers
app.use(express.json())
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://vocal-fox-1c3e87.netlify.app',
      'https://car-rental-cf.netlify.app',
    ],
    credentials: true,
  })
)
app.use(cookieParser())
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')))

//application routes
app.use('/api/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Car Rental Reservation System')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
