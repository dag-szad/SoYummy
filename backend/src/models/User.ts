import mongoose, { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    username: string
    email: string
    password: string
    profilePicture: string
    shoppingListId?: mongoose.Schema.Types.ObjectId
    favoriteListId?: mongoose.Schema.Types.ObjectId
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePicture: { type: String, default: '' },
        shoppingListId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShoppingList',
            default: null,
        },
        favoriteListId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FavoriteList',
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

// Metoda do haszowania hasła przed zapisaniem użytkownika
userSchema.pre<IUser>('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

// Metoda do porównywania haseł
userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
