import express from 'express'
import {
    addFavorite,
    deleteFavorite,
    getFavorite,
} from '../controllers/favoriteListController'

const router = express.Router()

// Dodawanie przepisu do ulubionych
router.post('/:favListId/items', addFavorite)

// Usuwanie przepisu z ulubionych
router.delete('/:favListId/items/:recipeId', deleteFavorite)

// Dodawanie przepisu do ulubionych
router.get('/:favListId/items', getFavorite)

export default router
