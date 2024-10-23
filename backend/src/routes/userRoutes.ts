import { Router } from 'express'
import {
    getUserProfile,
    updateUsername,
    updateProfilePicture,
} from '../controllers/userController'
import { updateUsernameValidation } from '../middleware/validationMiddleware'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimetype = fileTypes.test(file.mimetype)

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            console.error('Invalid file type:', file.mimetype)
            cb(new Error('Only images are allowed!'))
        }
    },
})

const router = Router()

// Pobranie profilu użytkownika
router.get('/:id', getUserProfile)

// Aktualizacja nazwy użytkownika
router.post('/update-username', updateUsernameValidation, updateUsername)

// Aktualizacja zdjęcia profilowego
router.post(
    '/upload-profile-picture',
    upload.single('profilePicture'),
    updateProfilePicture
)

export default router
