import { Request, Response } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import User, { IUser } from '../models/User'
import ShoppingList from '../models/ShoppingList'
import Blacklist from '../models/Blacklist'

import { validationResult } from 'express-validator'

// Rejestracja użytkownika
export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return
        }
        const newUser = new User({ username, email, password })
        await newUser.save()

        const shoppingList = new ShoppingList({
            userId: newUser._id,
            items: [],
        })
        await shoppingList.save()

        newUser.shoppingListId =
            shoppingList._id as mongoose.Schema.Types.ObjectId
        await newUser.save()

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        )

        res.status(201).json({
            message: 'User registered successfully',
            token,
            userId: newUser._id,
            username: newUser.username,
            profilePicture: newUser.profilePicture,
            shoppingListId: shoppingList._id,
        })
    } catch (error) {
        console.error('Error during registration:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Logowanie użytkownika
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const user = (await User.findOne({ email })) as IUser
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials - user' })
            return
        }

        console.log(`Password from DB: ${user.password}`)
        console.log(`Password entered: ${password}`)

        const isPasswordValid = await user.comparePassword(password)
        console.log(`Is password valid? ${isPasswordValid}`)

        if (!isPasswordValid) {
            console.log('Invalid password')
            res.status(401).json({ message: 'Invalid credentials - password' })
            return
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        )

        res.status(200).json({
            token,
            userId: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            shoppingListId: user.shoppingListId,
        })
    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Wylogowanie
export const logoutUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const authHeader = req.headers['cookie'] as string | undefined
        if (!authHeader) {
            res.sendStatus(204)
            return
        }

        const cookie = authHeader.split('=')[1]
        const accessToken = cookie.split(';')[0]

        const newBlacklistEntry = new Blacklist({
            token: accessToken,
            type: 'access',
        })

        await newBlacklistEntry.save()

        res.setHeader('Clear-Site-Data', '"cookies", "storage"')
        res.status(201).json({
            message: 'User logged out successfully',
            clearedData: {
                token: null,
                username: null,
                profilePicture: null,
                id: null,
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
