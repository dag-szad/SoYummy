import { Router } from 'express'
import {
    getUserProfile,
    updateUsername,
    // updateProfilePicture,
} from '../controllers/userController'
import { updateUsernameValidation } from '../middleware/validationMiddleware'
import multer from 'multer'

const router = Router()
// const upload = multer({ dest: 'uploads/' })

// Pobranie profilu użytkownika
router.get('/:id', getUserProfile)

// Aktualizacja nazwy użytkownika
router.post('/update-username', updateUsernameValidation, updateUsername)

// Aktualizacja zdjęcia profilowego
// router.post(
//     '/upload-profile-picture',
//     upload.single('profilePicture'),
//     updateProfilePicture
// )

export default router
