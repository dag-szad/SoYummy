import { Request, Response } from 'express'
import FavoriteList from '../models/FavoriteList'

// Dodanie przepisu do listy
export const addFavorite = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { favListId } = req.params
    const { recipeId } = req.body

    try {
        const favoriteList = await FavoriteList.findById(favListId)
        if (!favoriteList) {
            res.status(404).json({ message: 'Favorite list not found' })
            return
        }

        favoriteList.recipes.push({
            id: recipeId,
        })

        await favoriteList.save()

        res.status(201).json({
            message: 'Ingredient added successfully',
            favoriteList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Usunięcie przepisu z listy
export const deleteFavorite = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { favListId, recipeId } = req.params

    try {
        const favoriteList = await FavoriteList.findById(favListId)
        if (!favoriteList) {
            res.status(404).json({ message: 'Favorite list not found' })
            return
        }

        const recipeIndex = favoriteList.recipes.findIndex(
            (item) => item.id.toString() === recipeId
        )
        if (recipeIndex === -1) {
            res.status(404).json({
                message: 'Recipe not found in the favorite list',
            })
            return
        }

        favoriteList.recipes.splice(recipeIndex, 1)

        await favoriteList.save()

        res.status(200).json({
            message: 'Item deleted successfully',
            favoriteList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
