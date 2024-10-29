import express from 'express'
import {
    getCategories,
    getCategoryById
} from '../controllers/categoryController'

const router = express.Router()

// Pobranie wszystkich kategorii
router.get('/', getCategories)

// Pobranie pojedynczej kategorii według ID
router.get('/:id', getCategoryById)

export default router
