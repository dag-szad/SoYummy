import mongoose, { Document, Schema } from 'mongoose'

interface IIngredient extends Document {
    ttl: string
    desc?: string
    thb?: string
}

const ingredientSchema: Schema = new Schema({
    ttl: { type: String, required: true },
    desc: { type: String },
    thb: { type: String },
})

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema)
