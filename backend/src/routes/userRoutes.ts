import express, { Router } from 'express'
import path from 'path'
import {
    getUserProfile,
    updateUsername,
    updateProfilePicture,
} from '../controllers/userController'
import { updateUsernameValidation } from '../middleware/validationMiddleware'
import upload from '../middleware/uploadMiddleware'

const router = express.Router()

// Pobranie profilu użytkownika
router.get('/:id', getUserProfile)

// Aktualizacja nazwy użytkownika
router.post('/update-username', updateUsernameValidation, updateUsername)

// Aktualizacja zdjęcia profilowego
router.post(
    '/:id/profile-picture',
    upload.single('profilePicture'),
    updateProfilePicture
)

router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename
    const filePath = path.join(__dirname, '../uploads', filename)
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found')
        }
    })
})

export default router
