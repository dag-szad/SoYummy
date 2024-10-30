import { Request, Response } from 'express'
import Recipe from '../models/Recipe'

// Pobranie przepisów według kategorii
export const getRecipesByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { category } = req.params

    try {
        const recipes = await Recipe.find({ category })
        res.status(200).json(recipes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Pobranie przepisów według kategorii z limitem
export const getRecipesByCategoryWithLimit = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { category, limit } = req.params

    try {
        const recipes = await Recipe.find({ category }).limit(Number(limit))
        res.status(200).json(recipes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Pobranie jednego przepisu według ID
export const getRecipeById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params

    try {
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' })
            return
        }
        res.status(200).json(recipe)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Wyszukiwanie przepisów według słowa kluczowego w tytule
export const searchRecipesByTitle = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { keyword } = req.params

    try {
        const recipes = await Recipe.find({
            title: { $regex: keyword, $options: 'i' },
        })
        res.status(200).json(recipes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Wyszukiwanie przepisów według składnika
export const searchRecipesByIngredient = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { ingredient } = req.params

    try {
        const recipes = await Recipe.find({ ingredients: ingredient })
        res.status(200).json(recipes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
