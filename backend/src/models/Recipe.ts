import mongoose, { Document, Schema } from 'mongoose'

interface IIngredients {
    id: mongoose.Schema.Types.ObjectId;
    measure?: string;
}

interface IRecipe extends Document {
    title: string
    category: string
    area?: string
    instructions?: string
    description?: string
    thumb?: string
    ingredients: IIngredients[];
}

const recipeSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String },
    area: { type: String },
    instructions: { type: String },
    description: { type: String },
    thumb: { type: String },
    ingredients: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        measure: { type: String }
    }],
})

export default mongoose.model<IRecipe>('Recipe', recipeSchema)
