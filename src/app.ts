import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//application routes
app.use('/api/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Car Rental Reservation System')
})

export default app
