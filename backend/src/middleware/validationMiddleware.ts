import { body } from 'express-validator'

// Walidacja danych rejestracji
export const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .trim()
        .escape(),

    body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
]

// Walidacja danych logowania
export const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),

    body('password').notEmpty().withMessage('Password is required'),
]

// Walidacja aktualizacji nazwy użytkownika
export const updateUsernameValidation = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
]

// Walidacja aktualizacji zdjęcia profilowego
// export const profilePictureValidation = [
//     body('userId').notEmpty().withMessage('User ID is required'),
// ]
