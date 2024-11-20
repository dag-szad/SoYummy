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

        if (favoriteList.items.some((item) => item.toString() === recipeId)) {
            res.status(400).json({
                message: 'Recipe already in the favorite list',
            })
            return
        }

        favoriteList.items.push(recipeId)
        await favoriteList.save()

        res.status(201).json({
            message: 'Ingredient added successfully',
            favoriteList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error })
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

        const recipeIndex = favoriteList.items.findIndex(
            (item) => item.toString() === recipeId
        )
        if (recipeIndex === -1) {
            res.status(404).json({
                message: 'Recipe not found in the favorite list',
            })
            return
        }

        favoriteList.items.splice(recipeIndex, 1)
        await favoriteList.save()

        res.status(200).json({
            message: 'Item deleted successfully',
            favoriteList,
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

// Pobranie całej listy
export const getFavorite = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { favListId } = req.params

    try {
        const favoriteList = await FavoriteList.findById(favListId)
        if (!favoriteList) {
            res.status(404).json({ message: 'Favorite list not found' })
            return
        }

        res.status(200).json(favoriteList)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}
