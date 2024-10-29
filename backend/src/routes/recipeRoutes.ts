import express from 'express'
import {
    getRecipesByCategory,
    getRecipesByCategoryWithLimit,
    getRecipeById,
    searchRecipesByTitle,
    searchRecipesByIngredient,
} from '../controllers/recipeController'

const router = express.Router()

// Otrzymanie przepisów według kategorii
router.get('/categories/:category', getRecipesByCategory)

// Otrzymanie przepisów według kategorii z limitem
router.get('/categories/:category/:limit', getRecipesByCategoryWithLimit)

// Otrzymanie jednego przepisu według ID
router.get('/:id', getRecipeById)

// Wyszukiwanie przepisów według słowa kluczowego w tytule
router.get('/search/title/:keyword', searchRecipesByTitle)

// Wyszukiwanie przepisów według składnika
router.get('/search/ingredient/:ingredient', searchRecipesByIngredient)

export default router
