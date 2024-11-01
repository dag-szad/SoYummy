import mongoose, { Document, Schema } from 'mongoose'

interface IRecipe extends Document {
    title: string
    category: string
    area?: string
    instructions?: string
    description?: string
    thumb?: string
    ingredients: string[]
}

const recipeSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String },
    area: { type: String },
    instructions: { type: String },
    description: { type: String },
    thumb: { type: String },
    ingredients: [{ type: String }],
})

export default mongoose.model<IRecipe>('Recipe', recipeSchema)
