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
    const { id } = req.params

    try {
        const category = await Category.findOne({ _id: id })

        if (!category) {
            res.status(404).json({ message: 'Category not found' })
            return
        }

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}