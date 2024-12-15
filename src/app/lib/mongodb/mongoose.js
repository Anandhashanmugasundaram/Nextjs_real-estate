import mongoose from 'mongoose'

export const connectionOfDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'nextjs-15-estate'
        })
        console.log(`Db connected`);
        
    } catch (error) {
        console.log(`MongoDb error:` ,error);

    }
}