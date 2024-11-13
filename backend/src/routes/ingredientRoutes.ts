import express from 'express'
import { getIngredientById } from '../controllers/ingredientController'

const router = express.Router()

// Pobranie składnika według ID
router.get('/:id', getIngredientById)

export default router
