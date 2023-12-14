import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }

}, { timestamps: true })

export default mongoose.model('user', UserSchema);