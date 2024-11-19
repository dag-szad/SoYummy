import mongoose, { Document, Schema } from 'mongoose'

interface IRecipe {
    id: mongoose.Schema.Types.ObjectId
}

interface IFavoriteList extends Document {
    userId: mongoose.Schema.Types.ObjectId
    recipes: IRecipe[]
}

const favoriteListSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipes: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
        },
    ],
})

export default mongoose.model<IFavoriteList>('FavoriteList', favoriteListSchema)
