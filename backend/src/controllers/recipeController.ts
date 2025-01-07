import { Request, Response } from 'express'
import Recipe from '../models/Recipe'
import Ingredient from '../models/Ingredient'

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
    const { ingredientName } = req.params

    if (!ingredientName) {
        res.status(400).json({ message: 'Ingredient name is required' })
        return
    }

    try {
        const ingredient = await Ingredient.findOne({
            ttl: { $regex: ingredientName, $options: 'i' },
        })

        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' })
            return
        }

        const recipes = await Recipe.find({
            ingredients: { $elemMatch: { id: ingredient._id } },
        })

        res.status(200).json(recipes)

        if (recipes.length === 0) {
            res.status(404).json({
                message: 'No recipes found for this ingredient',
            })
            return
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Dodanie przepisu
export const addNewRecipe = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        title,
        category,
        area,
        instructions,
        description,
        thumb,
        ingredients,
    } = req.body

    if (
        !title ||
        !category ||
        !area ||
        !instructions ||
        !description ||
        !ingredients
    ) {
        res.status(400).json({ message: 'All fields are required' })
        return
    }

    try {
        const existingRecipe = await Recipe.findOne({ title })
        if (existingRecipe) {
            res.status(400).json({ message: 'Recipe already exists' })
            return
        }

        const newRecipe = new Recipe({
            title,
            category,
            area,
            instructions,
            description,
            thumb,
            ingredients, // Dokończyć składniki
        })

        await newRecipe.save()
        res.status(201).json({
            message: 'Recipe added successfully',
            recipe: newRecipe,
        })
    } catch (error) {
        console.error('Error during recipe adding:', error)
        res.status(500).json({ message: 'Server error' })
    }
}
