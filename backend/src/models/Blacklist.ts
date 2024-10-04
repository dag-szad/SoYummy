import { Schema, model } from 'mongoose'

const blacklistSchema = new Schema(
    {
        token: { type: String, required: true, index: true },
    },
    {
        timestamps: true,
    }
)

const Blacklist = model('Blacklist', blacklistSchema)

export default Blacklist
