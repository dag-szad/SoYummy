import express, { Request, Response, NextFunction } from 'express'
import multer, { StorageEngine } from 'multer'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cors from 'cors'

import connectDB from './database'
import Blacklist from './models/Blacklist'
import User from './models/User'
import path from 'path'

const port: number = 3000
const app: express.Application = express()

app.use(express.json())
app.use(cors())

connectDB()

// Endpoint rejestracji
app.post('/register', async (req: Request, res: Response): Promise<void> => {
    const {
        username,
        email,
        password,
    }: { username: string; email: string; password: string } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        const hashedPassword: string = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        const token: string = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || 'your_jwt_secret',
            {
                expiresIn: '1h',
            }
        )

        res.status(201).json({ message: 'User registered successfully', token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// Endpoint logowania
app.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password }: { email: string; password: string } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            user.password
        )
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token: string = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'your_jwt_secret',
            {
                expiresIn: '1h',
            }
        )

        res.status(200).json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// Endpoint wylogowania
app.post('/logout', async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader: string | undefined = req.headers['cookie'] as
            | string
            | undefined
        if (!authHeader) {
            res.sendStatus(204)
            return
        }
        const cookie: string = authHeader.split('=')[1]
        const accessToken: string = cookie.split(';')[0]
        const checkIfBlacklisted = await Blacklist.findOne({
            token: accessToken,
        })
        if (checkIfBlacklisted) {
            res.sendStatus(204)
            return
        }
        const newBlacklist = new Blacklist({
            token: accessToken,
        })
        await newBlacklist.save()
        res.setHeader('Clear-Site-Data', '"cookies"')
        res.status(201).json({ message: 'User logged out successfully' })
    } catch (error: unknown) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

// Upload zdjęcia profilowego
const storage: StorageEngine = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: any, destination: string) => void
    ) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: any, filename: string) => void
    ) => {
        const uniqueSuffix: string =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimetype = fileTypes.test(file.mimetype)

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            cb(
                new Error(
                    'Error: File upload only supports the following filetypes - ' +
                        fileTypes
                )
            )
        }
    },
})

app.post(
    '/upload-profile-picture',
    upload.single('profilePicture'),
    async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({
                    error: 'No file uploaded.',
                })
                return
            }
            const profilePictureUrl = `/uploads/${req.file.filename}`
            const userId = req.body.userId
            await User.findByIdAndUpdate(userId, {
                profilePicture: profilePictureUrl,
            })

            res.status(200).json({
                message: 'Profile picture uploaded successfully',
                url: profilePictureUrl,
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                error: 'An error occurred while uploading the picture',
            })
        }
    }
)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Testowy endpoint
app.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Hello from backend!</h1>')
})

// Globalny handler błędów
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
})

// Uruchomienie serwera
app.listen(port, (): void => {
    console.log(`Backend listening at http://localhost:${port}`)
})
