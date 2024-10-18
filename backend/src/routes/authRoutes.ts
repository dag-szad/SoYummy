import { Router } from 'express'
import {
    registerUser,
    loginUser,
    logoutUser,
} from '../controllers/authController'
import {
    registerValidation,
    loginValidation,
} from '../middleware/validationMiddleware'

const router = Router()

// Rejestracja
router.post('/register', registerValidation, registerUser)

// Logowanie
router.post('/login', loginValidation, loginUser)

// Wylogowanie
router.post('/logout', logoutUser)

export default router
