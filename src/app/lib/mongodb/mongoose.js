import mongoose from 'mongoose'

export const connectionOfDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Db connected`);
        
    } catch (error) {
        console.log(`MongoDb error:` ,error);

    }
}