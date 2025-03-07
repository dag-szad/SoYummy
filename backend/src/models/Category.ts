import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
    _id: string
    title: string
    thumb?: string
    description?: string
}

const categorySchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    thumb: { type: String },
    description: { type: String },
})

export default mongoose.model<ICategory>('Category', categorySchema)
