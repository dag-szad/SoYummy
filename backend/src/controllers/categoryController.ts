import { Request, Response } from 'express'
import Category from '../models/Category'

// Pobranie wszystkich kategorii
export const getCategories = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const categoriesList = await Category.find()
        res.status(200).json(categoriesList)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

// Pobranie pojedynczej kategorii według ID
export const getCategoryById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const categoryId = req.params.id

    try {
        const category = await Category.findById(categoryId)
        if (!category) {
            res.status(404).json({ message: 'Category not found' })
            return
        }
        res.status(200).json(category)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}
