import { Request, Response } from 'express'
import ShoppingList from '../models/ShoppingList'

// Dodanie składnika do listy
export const addToList = async (req: Request, res: Response): Promise<void> => {
    const { listId } = req.params
    const { ingredientId, measure, quantity } = req.body

    try {
        const shoppingList = await ShoppingList.findById(listId)
        if (!shoppingList) {
            res.status(404).json({ message: 'Shopping list not found' })
            return
        }

        shoppingList.items.push({
            id: ingredientId,
            measure,
            isPurchased: false,
        })

        await shoppingList.save()

        res.status(201).json({
            message: 'Ingredient added successfully',
            shoppingList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Usunięcie składnika z listy
export const deleteFromList = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { listId, itemId } = req.params

    try {
        const shoppingList = await ShoppingList.findById(listId)
        if (!shoppingList) {
            res.status(404).json({ message: 'Shopping list not found' })
            return
        }

        const itemIndex = shoppingList.items.findIndex(
            (item) => item.id.toString() === itemId
        )
        if (itemIndex === -1) {
            res.status(404).json({
                message: 'Item not found in the shopping list',
            })
            return
        }

        shoppingList.items.splice(itemIndex, 1)

        await shoppingList.save()

        res.status(200).json({
            message: 'Item deleted successfully',
            shoppingList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Usunięcie wszystkich składników z listy
export const deleteList = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { listId } = req.params

    try {
        const shoppingList = await ShoppingList.findById(listId)
        if (!shoppingList) {
            res.status(404).json({ message: 'Shopping list not found' })
            return
        }

        shoppingList.items = []

        await shoppingList.save()

        res.status(200).json({
            message: 'All items deleted successfully',
            shoppingList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Pobranie całej listy
export const getList = async (req: Request, res: Response): Promise<void> => {
    const { listId } = req.params

    try {
        const shoppingList = await ShoppingList.findById(listId)
        if (!shoppingList) {
            res.status(404).json({ message: 'Shopping list not found' })
            return
        }

        res.status(200).json(shoppingList)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
