import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI: string | undefined = process.env.MONGO_URI
        if (!mongoURI) {
            throw new Error(
                'MONGO_URI is not defined in the environment variables'
            )
        }
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB')
    } catch (err) {
        if (err instanceof Error) {
            console.error('MongoDB connection error:', err.message)
        } else {
            console.error('MongoDB connection error:', err)
        }
        process.exit(1)
    }
}

export default connectDB
