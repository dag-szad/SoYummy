import { Request, Response } from 'express'
import Ingredient from '../models/Ingredient'

// Pobranie składnika według ID
export const getIngredientById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params

    try {
        const ingredient = await Ingredient.findById(id)
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' })
            return
        }
        res.status(200).json(ingredient)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
