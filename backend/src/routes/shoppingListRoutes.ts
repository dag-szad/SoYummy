import express from 'express'
import {
    addToList,
    deleteFromList,
    deleteList,
} from '../controllers/shoppingListController'

const router = express.Router()

// Dodawanie składnika do listy zakupów
router.post('/:listId/items', addToList)

// Usuwanie jednego składnika
router.delete('/:listId/items/:itemId', deleteFromList)

// Usuwanie całej listy
router.delete('/:listId/items', deleteList)

export default router
