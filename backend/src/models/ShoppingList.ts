import mongoose, { Document, Schema } from 'mongoose'

interface IIngredient {
    id: mongoose.Schema.Types.ObjectId
    measure?: string
    isPurchased?: boolean
}

interface IShoppingList extends Document {
    userId: mongoose.Schema.Types.ObjectId
    items: IIngredient[]
}

const shoppingListSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
            measure: { type: String },
            isPurchased: { type: Boolean, default: false },
        },
    ],
})

export default mongoose.model<IShoppingList>('ShoppingList', shoppingListSchema)
