import mongoose, { Document, Schema, Types } from 'mongoose'

interface IIngredient extends Document {
    ttl: string
    desc?: string
    thb?: string
}

const ingredientSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    ttl: { type: String },
    desc: { type: String },
    thb: { type: String },
})

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema)
