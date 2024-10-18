import { Schema, model } from 'mongoose'

enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
}

const blacklistSchema = new Schema(
    {
        token: { type: String, required: true, index: true },
        type: { type: String, enum: Object.values(TokenType), required: true },
    },
    {
        timestamps: true,
    }
)

// Dodanie statycznej metody do sprawdzania, czy token jest na czarnej liście
blacklistSchema.statics.isTokenBlacklisted = async function (token: string) {
    const entry = await this.findOne({ token })
    return !!entry
}

const Blacklist = model('Blacklist', blacklistSchema)

export default Blacklist
