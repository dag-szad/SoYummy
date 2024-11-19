import express from 'express'
import {
    addFavorite,
    deleteFavorite,
} from '../controllers/favoriteListController'

const router = express.Router()

// Dodawanie przepisu do ulubionych
router.post('/:favListId/add/:recipeId', addFavorite)

// Usuwanie przepisu z ulubionych
router.delete('/:favListId/delete/:recipeId', deleteFavorite)

export default router