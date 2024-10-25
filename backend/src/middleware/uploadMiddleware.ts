import multer from 'multer'
import path from 'path'

// Konfiguracja multer do przechowywania plików
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

// Ustawienia multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        )

        if (mimetype && extname) {
            return cb(null, true)
        }

        cb(new Error('Error: File type not supported!'))
    },
})

// Eksport middleware
export default upload
