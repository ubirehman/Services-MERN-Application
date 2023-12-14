import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const ConnectDB = async () => {
    try {
        console.log();
        await mongoose.connect(process.env.MONGO_DB);
        console.log('DB Connected');
    }
    catch (error) {
        console.error(error);
    }
}


