import mongoose, { Document, Schema } from 'mongoose'

interface IIngredient extends Document {
    _id: string,
    ttl: string
    desc?: string
    thb?: string
}

const ingredientSchema: Schema = new Schema({
    _id: { type: String, required: true },
    ttl: { type: String },
    desc: { type: String },
    thb: { type: String },
})

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema)
