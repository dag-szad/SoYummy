import mongoose, { Document, Schema } from 'mongoose'

interface IFavoriteList extends Document {
    userId: mongoose.Schema.Types.ObjectId
    items: mongoose.Schema.Types.ObjectId[]
}

const favoriteListSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
        ],
        default: [],
    },
})

export default mongoose.model<IFavoriteList>('FavoriteList', favoriteListSchema)
