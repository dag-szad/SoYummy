import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import connectDB from './database'

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

import { errorHandler } from './middleware/errorHandler'

const port: number = 3000
const app: express.Application = express()

dotenv.config()
app.use(express.json())
app.use(cors())

connectDB()

// Główne endpointy
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Testowy endpoint
app.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Hello from backend!</h1>')
})

// Globalny handler błędów
app.use(errorHandler)

// Uruchomienie serwera
app.listen(port, (): void => {
    console.log(`Backend listening at http://localhost:${port}`)
})
