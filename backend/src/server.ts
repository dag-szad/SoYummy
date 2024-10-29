import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

import connectDB from './database'

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import recipeRoutes from './routes/recipeRoutes'

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
app.use('/categories', categoryRoutes)
app.use('/recipes', recipeRoutes)

const uploadsDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
    console.log('Folder "uploads" created.')
}
app.use('/uploads', express.static(uploadsDir))

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
