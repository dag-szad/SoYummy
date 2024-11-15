import express from 'express'
import {
    addToList,
    deleteFromList,
    deleteList,
    getList,
} from '../controllers/shoppingListController'

const router = express.Router()

// Dodawanie składnika do listy zakupów
router.post('/:listId/items', addToList)

// Usuwanie jednego składnika
router.delete('/:listId/items/:itemId', deleteFromList)

// Usuwanie całej listy
router.delete('/:listId/items', deleteList)

// Pobranie całej listy
router.get('/:listId', getList)

export default router
